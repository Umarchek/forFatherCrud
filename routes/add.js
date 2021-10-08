const {
    Router
} = require('express')
const router = Router()
const Car = require('../models/Cars')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add car',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const cars = new Car(req.body.model, req.body.price, req.body.img)
    console.log(req.body); /* {model: 'asd', price: 12, img: 'asd'} */
    await cars.save()
    res.redirect('/cars')
})


module.exports = router