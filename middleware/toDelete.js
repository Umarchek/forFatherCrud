const fs = require('fs')
const path = require('path')

const toDelete = async (filePath) => {
    const p = path.dirname(require.main.filename)
    await fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
        } else {

        }
    })
}
module.exports = {
    toDelete
}