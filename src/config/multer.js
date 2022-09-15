const multer = require('multer')
const path = require('path')

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/avatars"))
    },
    filename: (req, file, cb) => {
        cb(null, req.user.email + "" + path.extname(file.originalname))
    }
})
const imgFileFilter = (req, file, cb) => {
    console.log(file.path);
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const uploadImg = multer({ storage: myStorage, fileFilter: imgFileFilter })
console.log(uploadImg.getDestionation);

module.exports = uploadImg