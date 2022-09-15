const { body } = require('express-validator')

const validateNewUser = () => {
    return [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Geçerli bir email giriniz'),

        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Şifre en az 6 karakter olmalı')
            .isLength({ max: 20 })
            .withMessage('Şifre en fazla 20 karakter olmalı'),

        body('firstname')
            .trim()
            .isLength({ min: 2 })
            .withMessage('İsim en az 2 karekter olmalı')
            .isLength({ max: 30 })
            .withMessage('İsim en fazla 30 karakter olmalı'),
        body('lastname')
            .trim()
            .isLength({ min: 2 })
            .withMessage('Soyad en az 2 karekter olmalı')
            .isLength({ max: 30 })
            .withMessage('Soyad en fazla 30 karakter olmalı'),

        body('repassword')
            .trim().custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Şifreler aynı değil')
                }
                return true
            })

    ]
}

const validateLogin = () => {
    return [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Geçerli bir email giriniz'),

        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Şifre en az 6 karekter olmalı')
            .isLength({ max: 20 })
            .withMessage('Şifre en fazla 20 karakter olmalı'),
    ]
}
module.exports = { validateNewUser , validateLogin}