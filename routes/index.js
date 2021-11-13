const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const products = await Product.find()
  // console.log(products); // massiv

  res.render('index', {
    title: 'Express',
    products
  });
});

router.post('/new', async function (req, res, next) {
  // console.log(req.body);

  const { name, price } = req.body
  const product = new Product({
    name,
    price
  })

  await product.save()
  res.redirect('/')
});

module.exports = router;
