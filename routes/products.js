const {
    Router
} = require('express')
const router = Router()
const Category = require('../models/Category')
const fileMiddleware = require('../middleware/fileMiddleware')
const Product = require('../models/Product')

router.get('/products', async (req, res) => {
    const products = await Product.find()
    res.render('admin/products', {
        layout: 'admin',
        title: 'Maxsulotlar sahifasi',
        products
    })
})

router.get('/products/add', async (req, res) => {
    const categories = await Category.find()
    res.render('admin/addProduct', {
        layout: 'admin',
        title: 'Maxsulot yaratish sahifasi',
        categories
    })
})

router.post('/products/add', fileMiddleware.single('img'), async (req, res) => {
    const img = req.file.filename
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        img,
        categoryId: req.body.categoryId
    })
    await product.save()
    res.redirect('/admin/products')
})

module.exports = router