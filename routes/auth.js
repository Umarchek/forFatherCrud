const { Router } = require("express");
const fileMiddleware = require("../middleware/fileMiddleware");
const router = Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const isExist = await Admin.findOne({ login });
    console.log(isExist);
    if (isExist) {
      bcrypt.compare(password, isExist.password, (err, success) => {
        if (success) {
          req.session.isAuth = true;
          req.session.admin = isExist;
          req.session.save((err) => {
            if (err) {
              throw err;
            } else {
              res.redirect("/admin");
            }
          });
        } else {
          res.redirect("/auth/login");
        }
      }); //
    } else {
      res.redirect("/auth/login");
    }
  } catch (err) {
    throw err;
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
  });
});

router.post("/register", fileMiddleware.single("avatar"), async (req, res) => {
  const { login, name, password } = req.body;
  req.file ? (avatar = req.file.filename) : (avatar = "");
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({
    login,
    name,
    password: hash,
    avatar,
  });
  await admin.save();
  res.redirect("/auth/login");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("auth/login", {
    title: "Login",
  });
});

module.exports = router;
