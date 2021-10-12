const fs = require('fs')
const path = require('path')
const p = path.dirname(require.main.filename)

const toDelete = async (filePath) => {
    if (filePath) {
        await fs.unlink(p + '../public/images/' + filePath, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}
module.exports = {
    toDelete
}