const mongoose = require('mongoose')
const uri = 'mongodb+srv://Umarjon007:4D3jawAVR2r5KOBr@cluster0.7ksdl.mongodb.net/Tractors'

module.exports = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', function () {
            console.log('MongoDB connected global');
        })
    } catch (err) {
        throw err
    }
}