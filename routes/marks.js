const { Router } = require('express')
const router = Router()

router.get('/marks', (req, res) => {
    res.render('admin/marks', {
        title: "Car models",
        layout: 'admin'
    })
})
module.exports = router