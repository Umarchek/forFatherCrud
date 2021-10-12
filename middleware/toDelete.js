const fs = require('fs')
const path = require('path')
const p = path.dirname(require.main.filename)

module.exports = (filePath) => {
    console.log(filePath);
    if (filePath) {
        fs.unlink(p + '/../public/images/' + filePath, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}