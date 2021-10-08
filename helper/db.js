const mongoose = require('mongoose')
const URI = 'mongodb+srv://Mirzaabdullayev:y29GnNM1Fh8H7zyY@cluster0.oler2.mongodb.net/car'

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