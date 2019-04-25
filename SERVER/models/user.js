const mongoose=require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    
})

const User = mongoose.model('User', userSchema);

module.exports = { User }