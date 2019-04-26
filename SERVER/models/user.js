const mongoose=require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1               // duy nhat
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    cart: {
        type: Array,
        default: [],

    },
    history: {
        type: Array,
        default: [],
    },
    role: {
        type: Number,
        default: 0
    },
    token: {                            // chua biet de lam gi
        type: String
    }

});

//hash password
userSchema.pre('save', function(next){                  // truoc khi user.save((err,doc)) thi no lam ham nay
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET);

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET, function(err,decode){              // se giai ma (decode) duoc _id cua user
        user.findOne({"_id":decode, "token":token},function(err, user){
            if(err) return cb(err);

            cb(null,user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }