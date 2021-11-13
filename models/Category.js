const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryIcon: {
        type: String,
        required: true
    },
    sortNumber: {
        type: Number,
        required: true
    }
})

module.exports = model('category', CategorySchema)