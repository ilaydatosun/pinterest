const login = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error', ['Lütfen önce oturum açın'])
        res.redirect('/login')
    }
}
const noLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/blog')
    }
}

module.exports = { login, noLogin}