const mongoose=require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = { User }