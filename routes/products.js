const {
    Router
} = require('express')
const Category = require('../models/Category')
const Product = require('../models/Product')
const router = Router()
const fileMiddleware = require('../middleware/fileMiddleware')
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
router.post('/products/add', fileMiddleware.single('img'), async (req, res) => {
    
    const product = new Product.find({
        name: req.body.name,
        price: req.body.price
    })
})

module.exports = router