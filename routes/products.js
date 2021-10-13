const {
    Router
} = require('express')
const Category = require('../models/Category')
const router = Router()

router.get('/products', (req, res) => {
    res.render('admin/products', {
        layout: 'admin',
        title: 'Maxsulotlar sahifasi' 
    })
})

router.get('/products/add', async (req, res) => {
    const categories = await Category.find()
    res.render('admin/addProduct', {
        layout: 'admin',
        title: 'Maxsulotlar sahifasi',
        categories
    })
})

module.exports = router