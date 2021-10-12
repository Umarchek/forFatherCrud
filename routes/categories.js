const {
    Router
} = require('express')
const router = Router()
const Category = require('../models/Category')
const fileMiddleware = require('../middleware/file')

router.get('/categories', async (req, res) => {
    const categories = await Category.find()
    res.render('admin/categories', {
        layout: 'admin',
        categories
    })
})

router.get('/categories/add', (req, res) => {
    res.render('admin/addCategory', {
        layout: 'admin',
        title: 'Create category'
    })
})

router.post('/categories/add', fileMiddleware.single('img'), async (req, res) => {
    const {
        name, description
    } = req.body
    req.file ? img = req.file.filename : img = ''

    const category = new Category({
        name,
        description,
        img
    })
    await category.save()
    res.redirect('/admin/categories')
})


router.get('/categories/edit/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    res.render('admin/editCategory', {
        title: 'Edit category',
        category,
        layout: 'admin'
    })
})

router.post('/categories/edit/:id', fileMiddleware.single('img'), async (req, res) => {
    const admin = req.body
    admin.img = req.file.filename
    await Category.findByIdAndUpdate(req.params.id, admin, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('admin/categories')
        }
    })
})
module.exports = router