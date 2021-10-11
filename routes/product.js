const {
    Router
} = require('express')
const router = Router()


router.get('/product', (req, res) => {
    res.render('admin/product', {
        layout: 'admin',
        title: 'Car models',
    })
})

module.exports = router