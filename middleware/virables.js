module.exports = (req, res, next) => {
    res.locals.isAuthen = req.session.isAuth  // true , false

    next()
}