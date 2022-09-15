const router=require('express').Router()
const blogController=require('../controllers/blogController')


// router.post('/', blogController.search)
router.get('/', blogController.allPosts)
router.get('/:postID', blogController.onePost)



module.exports=router