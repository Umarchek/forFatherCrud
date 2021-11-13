const { Router } = require('express')
const router = Router()
const fileUpload = require('../middleware/fileUpload')
const Product = require('../models/Product')
const auth = require('../middleware/auth')

router.get('/view', auth, async (req, res) => {
    const products = await Product.find()

    res.render('admin/products', {
        header: 'Mahsulotlarni ko`rish',
        title: 'Mahsulotlar',
        layout: 'main',
        products
    })
})

router.get('/add', auth, async (req, res) => {
    const categories = await product.find()
    res.render('admin/productCreate', {
        header: 'Mahsulot yaratish',
        layout: 'main',
        categories
    })
})

router.post('/add', auth, fileUpload.single('img'), async (req, res) => {
    const { name, price, productId } = req.body
    console.log(req.file);
    const img = req.file.filename

    const product = new Product({
        name,
        price,
        img,
        productId
    })

    await product.save()
    res.redirect('/admin/product/view')
})
router.get('/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    console.log(product)
    res.render('admin/productEdit', {
        product,
        header: 'Kategoriyalarni yangilash',
        title: 'Kategoriyalarni yangilash',
        layout: 'main'
    })
})
router.post('/edit/:id', fileUpload.single('img'), async (req, res) => {
    const { img } = await Product.findById(req.params.id)
    const product = req.body

    if (req.file) {
        toDelete(img)
        product.img = req.file.filename
    }

    await product.findByIdandUpdate(req.params.id, product, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/product/read')
        }
    })
})
module.exports = router