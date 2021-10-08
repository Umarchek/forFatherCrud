const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')


// routes
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const carsRouter = require('./routes/cars')


// public ulash jarayoni
app.use(express.static(path.join(__dirname, 'public')))

// post registratsiya
app.use(express.urlencoded({extended: true}))

// hbs ulash jarayoni
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// use router
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/cars', carsRouter)

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact page',
        isContact: true
    })
})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express working on ${port} port`);
})