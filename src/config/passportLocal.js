const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const User = require('../model/userModel')

module.exports = function (passport) {
    const options = {
        usernameField: 'email',
        passwordField: 'password'
    }
    passport.use(new LocalStrategy(options, async (email, password, done) => {

        try {
            const _findUser = await User.findOne({ email: email })
            if (!_findUser) {
                return done(null, false, { message: 'User bulunamadı' })
            }
            if (_findUser.password !== password) {
                return done(null, false, { message: 'Şifre hatalı' })
            } else {
                return done(null, _findUser)
            }
        } catch (err) {
            return done(err)
        }


    }))
    passport.serializeUser(function (user, done) {
        // console.log("sessiona kaydedildi " + user.id)
        done(null, user.id)
    })
    passport.deserializeUser(function (id, done) {
        // console.log("sessiona kaydedilen id veritabanında arandı ve bulundu");
        User.findById(id, function (err, user) {

            const newUser = {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                password: user.password,
                createdAt: user.createdAt,
                avatar: user.avatar
            }
            done(err, newUser)
        })
    })

}
