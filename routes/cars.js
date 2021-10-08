const {
    Router
} = require('express')
const router = Router()
const Car = require('../models/Cars')

router.get('/', async (req, res) => {
    const cars = await Car.getAll()
    res.render('cars', {
        title: 'Car models',
        isCars: true,
        cars // massiv
    })
})

module.exports = router