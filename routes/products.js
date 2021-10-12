const {
    Router
} = require('express')
const router = Router()

router.get('/products', (req, res) => {
    res.render('admin/products', {
        layout: 'admin',
        title: 'Maxsulotlar sahifasi'
    })
})

module.exports = router