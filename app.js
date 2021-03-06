const express = require('express');
const exhbs = require('express-handlebars')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session)

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');

const variables = require('./middleware/virables')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', exhbs({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'layout',
  extname: 'hbs',
  partialsDir: [
    path.join(__dirname, 'views/partials')
  ],
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
}))

const store = new MongoStore({
  uri: 'mongodb+srv://Umarjon007:4D3jawAVR2r5KOBr@cluster0.7ksdl.mongodb.net/myFirstDatabase',
  collection: 'session'
})

require('./helper/db')()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  secret: 'some_secret_key',
  saveUninitialized: false,
  store
}))

app.use('/admin', express.static(path.join(__dirname, 'public')))
app.use('/admin:any', express.static(path.join(__dirname, 'public')))

app.use(variables)

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/admin/category', categoryRouter);
app.use('/admin/product', productRouter);
app.use('/auth', authRouter);

module.exports = app;
