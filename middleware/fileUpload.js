const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter
})