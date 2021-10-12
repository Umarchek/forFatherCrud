const { Router } = require('express')
const router = Router()
const fileMiddleware = require('../middleware/file')
const Category = require('../models/Category')
module.exports = router