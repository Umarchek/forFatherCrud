const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nmb: {
        type: Number,
        required: true
    },
    marks: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categoryId: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    }
})

module.exports = model('product', ProductSchema)