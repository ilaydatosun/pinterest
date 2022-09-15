const { body } = require('express-validator')

const validateNewPost = () => {
    return [

        body('title')
            .trim()
            .isLength({ min: 2 })
            .withMessage('İsim en az 2 karekter olmalı')
            .isLength({ max: 30 })
            .withMessage('İsim en fazla 30 karakter olmalı'),

        body('photo')
            .trim()
    ]
}
module.exports = validateNewPost