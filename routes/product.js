const {
    Router
} = require('express')
const router = Router()


router.get('/product', (req, res) => {
    res.render('admin/product', {
        layout: 'admin',
        title: 'Product models',
    })
})
router.get('/products/add', (req, res) => {
    res.render('admin/addProducts', {
        layout: 'admin',
        title: 'Product models',
    })
})

module.exports = router