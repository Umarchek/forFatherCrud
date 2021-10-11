const {
    Schema,
    model
} = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    more: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = model('product', productSchema)