const {
    Schema,
    model
} = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = model('category', categorySchema)