const multer = require('multer')
const moment = require('moment')

// storage filename // allowedTypes

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const date = moment().format("DDMMYYYY-HHmmss-sss")
        cb(null, `${date}-${file.filename}`)
    }
})
const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
module.exports = multer({
    storage, fileFilter
})