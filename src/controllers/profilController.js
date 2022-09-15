const User = require('../model/userModel')
const profilPage = function (req, res, next) {
    // console.log(req.user);
    //  console.log(req);

    res.render('profil', { user: req.user, layout: './layout/profilLayout.ejs' })
}
const profilUpdate = async function (req, res, next) {
// console.log(req.body);
    const updates = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    try {
        if (req.file) {
            updates.avatar = req.file.filename
        }
        const newInf = await User.findByIdAndUpdate(req.user.id, updates)
        if (newInf) {
            console.log("update tamamlandı")
            res.redirect('/profil')
        }
        console.log("güncellenecek bilgiler")
        console.log(updates)
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    profilPage, profilUpdate
}