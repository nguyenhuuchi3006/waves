const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 10000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 255
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    shipping: {
        required: true,
        type: Boolean
    },
    available: {
        required: true,
        type: Boolean
    },
    wood: {
        type: Schema.Types.ObjectId,
        ref: 'Wood',
        required: true
    },
    frets: {                    // so day dan
        required: true,
        type: Number
    },
    sold: {
        type: Number,
        maxlength: 255,
        default: 0
    },
    publish: {                      // cai nao dc sale
        type: Boolean,
        required: true
    },
    image: {
        type: Array,
        default: []
    }

},{timestamps: true});                          // nhu dan tem de biet when enter/update

const Product = mongoose.model('Product', productSchema);               // 'Product' la ten table
module.exports = { Product };