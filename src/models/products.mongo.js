const mongoose = require('mongoose');
const {v4} = require('uuid')

const productsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default : v4
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    user : {
        type: String,
        ref: 'User',
        required: true
    },
    visible : {
        type: Boolean,
        default : true,
        required : true
    }
})

productsSchema.index({id : 1},{unique:true})

module.exports = mongoose.model('Product',productsSchema);