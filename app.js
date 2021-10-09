const createError = require("http-errors");
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
const auth = require("./middleware/auth");

// Admin routes
const adminRouter = require("./routes/admin");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");

const uri =
  "mongodb+srv://Mirzaabdullayev:y29GnNM1Fh8H7zyY@cluster0.oler2.mongodb.net/car";

// MongoDB connection
require("./helper/db")();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/* Admin folders is reading */
app.use("/admin", express.static(path.join(__dirname, "public")));
app.use("/admin:any", express.static(path.join(__dirname, "public")));

var store = new MongoDBStore({
  uri,
  collection: "mySessions",
});

app.engine(
  "hbs",
  hbs({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "main",
    extname: "hbs",
    partialsDir: [path.join(__dirname, "views/partials")],
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "yashirin kalit",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", auth, adminRouter);
app.use("/admin", auth, productsRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
