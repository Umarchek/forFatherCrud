const { Router } = require('express')
const router = Router()
const fileUpload = require('../middleware/fileUpload')
const Category = require('../models/Category')
const toDelete = require('../middleware/toDelete')
const mongoose = require('mongoose')

router.get('/read', async (req, res) => {
    const categories = await Category.find()

    res.render('admin/categories', {
        title: 'Kategoriyalarni ko`rish',
        header: 'Kategoriyalarni ko`rish',
        categories,
        layout: 'main',
    })
})

router.get('/read/:id', async (req, res) => {
    const { categoryName } = await Category.findById(req.params.id)
    let products = await Category.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: "_id",
                foreignField: "categoryId",
                as: 'mahsulotlar'
            }
        },
        {
            $unwind: {
                path: '$mahsulotlar'
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id'
                },
                mahsulotlar: {
                    $push: '$mahsulotlar'
                }
            }
        },
        {
            $project: {
                _id: '$id._id',
                name: '$_id.name',
                price: '$_id.price',
                img: '$_id.img',
                mahsulotlar: '$mahsulotlar'
            }
        }
    ])

    // res.send(products[0].mahsulotlar)
    products = products[0].mahsulotlar

    console.log(products)
    res.render('admin/category', {
        header: categoryName,
        products,
        title: categoryName,
        layout: 'main'
    })
})

router.get('/add', (req, res) => {
    res.render('admin/categoryCreate', {
        title: 'Kategoriya yaratish',
        header: 'Kategoriya yaratish',
        layout: 'main',
    })
})

router.post('/add', fileUpload.single('categoryIcon'), async (req, res) => {
    const { categoryName, sortNumber } = req.body
    const categoryIcon = req.file.filename

    const category = new Category({
        categoryName,
        sortNumber,
        categoryIcon
    })

    await category.save()
    res.redirect('/admin/category/read')
})

router.get('/edit/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    res.render('admin/categoryEdit', {
        category,
        header: 'Kategoriyalarni yangilash',
        title: 'Kategoriyalarni yangilash',
        layout: 'main'
    })
})

router.post('/edit/:id', fileUpload.single('categoryIcon'), async (req, res) => {
    const { categoryIcon } = await Category.findById(req.params.id)
    const category = req.body

    if (req.file) {
        toDelete(categoryIcon)
        category.categoryIcon = req.file.filename
    }

    await Category.findByIdAndUpdate(req.params.id, category, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/category/read')
        }
    })
})

router.get('/delete/:id', async (req, res) => {
    try {
        const { categoryIcon } = await Category.findById(req.params.id)
        await Category.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                console.log(err);
            } else {
                toDelete(categoryIcon)
                res.redirect('/admin/category/read')
            }
        })
    }
    catch (err) {
        return { err: err.toString(), status: 500, data: null };
    }
})

module.exports = router