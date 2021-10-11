const {
    Router
} = require('express')
const router = Router()


router.get('/marks', (req, res) => {
    res.render('admin/marks', {
        layout: 'admin',
        title: 'Car models',
    })
})

module.exports = router