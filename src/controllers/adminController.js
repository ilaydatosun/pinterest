const mainPage= function(req, res, next){
    res.render('index', {layout: './layout/adminLayout.ejs'})
}

module.exports={
    mainPage
}