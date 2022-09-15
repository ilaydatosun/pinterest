const router = require('express').Router()
const adminController= require('../controllers/adminController')
const authMiddleware= require('../middlewares/authMiddleware')

router.get('/', authMiddleware.login , adminController.mainPage) 


module.exports = router