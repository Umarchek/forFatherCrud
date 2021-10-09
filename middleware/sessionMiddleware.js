module.exports = (req, res, next) => {
  res.locals.admin = req.session.isAuth;
  
  next();
};
