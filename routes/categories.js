const {
    Router
} = require('express')
const router = Router()
const Category = require('../models/Category')

router.get('/categories', (req, res) => {
    res.render('admin/categories', {
        layout: 'admin'
    })
})

router.get('/categories/add', (req, res) => {
    res.render('admin/addCategory', {
        layout: 'admin',
        title: 'Create category'
    })
})

router.post('/categories/add', (req, res) => {
    console.log(req.body);
    res.redirect('/admin/categories')
})


module.exports = router