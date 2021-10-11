const {
    Router
} = require('express')
const router = Router()
const Product = require('../models/Product')
const fileMiddleware = require('../middleware/file')

router.get('/products', async (req, res) => {
    const products = await Product.find()
    res.render('admin/products', {
        layout: 'admin',
        products
    })
})

router.get('/products/add', (req, res) => {
    res.render('admin/addProducts', {
        layout: 'admin',
        title: 'Create category'
    })
})

router.post('/products/add', fileMiddleware.single('img'), async (req, res) => {
    const {
        name, more
    } = req.body
    req.file ? img = req.file.filename : img = ''

    const products = new products({
        name,
        more,
        img
    })
    await products.save()
    res.redirect('/admin/products')
})


module.exports = router