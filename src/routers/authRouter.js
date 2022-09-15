const router = require('express').Router()
const authController= require('../controllers/authController')
const validatorMiddleware= require('../middlewares/validationMiddleware')
const authMiddleware= require('../middlewares/authMiddleware')


router.get('/login', authMiddleware.noLogin, authController.loginForm) 
router.post('/login', authMiddleware.noLogin, validatorMiddleware.validateLogin(), authController.login) 

router.get('/register',authMiddleware.noLogin, authController.registerForm)
router.post('/register',authMiddleware.noLogin, validatorMiddleware.validateNewUser(), authController.register)

router.get('/forget-password', authMiddleware.noLogin, authController.forgetPasswordForm)
router.post('/forget-password', authMiddleware.noLogin, authController.forgetPassword)

router.get('/logout',authMiddleware.login, authController.logout)

module.exports = router