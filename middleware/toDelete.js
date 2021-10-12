const fs = require('fs')
const path = require('path')

const toDelete = async (filePath) => {
    if (filePath) {
        await fs.unlink(path.join(__dirname) + '/public/images/' + filePath, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}
module.exports = {  
    toDelete
}