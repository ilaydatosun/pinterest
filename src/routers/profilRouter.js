const router=require('express').Router()
const profilController=require('../controllers/profilController')
const authMiddleware= require('../middlewares/authMiddleware')
const multerConfig=require('../config/multer')

router.get('/', authMiddleware.login ,profilController.profilPage)
router.post('/update', authMiddleware.login , multerConfig.single('avatar') ,profilController.profilUpdate)


module.exports=router