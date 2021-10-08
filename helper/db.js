const mongoose = require('mongoose')
const URI = 'mongodb+srv://Umarjon007:4D3jawAVR2r5KOBr@cluster0.7ksdl.mongodb.net/Tractors'

module.exports = () => {
    try {
        mongoose.connect(URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log('MongoDB connected with global');
        });

    } catch (err) {
        throw err;
    }
}