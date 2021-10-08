const {
    Router
} = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.render('admin/index', {
        title: 'Admin',
        layout: 'admin'
    })
})

module.exports = router