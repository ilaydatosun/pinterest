const { validationResult } = require('express-validator')
const User = require('../model/userModel')
const passport = require('passport')
require('../config/passportLocal')(passport)



const loginForm = (req, res, next) => {
    res.render('login', { layout: './layout/authLayout.ejs' })
}

const login = (req, res, next) => {
    // console.log(req.body);
    const error = validationResult(req)

    req.flash('email', req.body.email)
    req.flash('password', req.body.password)

    if (!error.isEmpty()) {
        req.flash('validation_error', error.array())

        res.redirect('/login')

    } else {

        passport.authenticate('local', {
            successRedirect: '/blog',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
}


const registerForm = (req, res, next) => {
    // console.log(req.flash('validation_error'));
    res.render('register', { layout: './layout/authLayout.ejs' })
}

const register = async (req, res, next) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        req.flash('validation_error', error.array())
        req.flash('email', req.body.email)
        req.flash('firstname', req.body.firstname)
        req.flash('lastname', req.body.lastname)
        req.flash('password', req.body.password)
        req.flash('repassword', req.body.repassword)
        res.redirect('/register')

    } else {
        try {
            const _user = await User.findOne({ email: req.body.email })
            if (_user) {

                req.flash('validation_error', [{ msg: "Bu mail daha önce alınmıştır." }])
                req.flash('email', req.body.email)
                req.flash('firstname', req.body.firstname)
                req.flash('lastname', req.body.lastname)
                req.flash('password', req.body.password)
                req.flash('repassword', req.body.repassword)
                res.redirect('/register')
            } else {
                const newUser = new User({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password,
                    // username:req.body.username
                })
                await newUser.save() //save db
                console.log("Kullanıcı kaydedildi");
                req.flash('success_message', [{ msg: 'Giriş yapabilirsiniz' }])
                res.redirect('/login') //kullanıcı login sayfasına yönlendiriliyor

            }
        } catch (err) {

        }
    }
}
const forgetPasswordForm = (req, res, next) => {
    res.render('forgetPassword', { layout: './layout/authLayout.ejs' })
}
const forgetPassword = (req, res, next) => {
    console.log(req.body);
    res.render('forgetPassword', { layout: './layout/authLayout.ejs' })
}

const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/blog');
    })
    // res.clearCookie('connect.sid')
}

module.exports = { loginForm, registerForm, forgetPasswordForm, register, login, forgetPassword, logout }