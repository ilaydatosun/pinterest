const router = require('express').Router()
const Blog = require('./../model/postModel')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads/images')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    }
})


router.get('/new', (req, res) => {
    res.render('new', { user: req.user })
})

router.get('/:id', async (req, res) => {
    let blog = await Blog.findOne({ _id: req.params.id })

    if (blog) {
        res.render('show', { blog: blog, layout: './layout/pinLayout.ejs' })

    } else {
        res.redirect('/')
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file)
    let blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        img: req.file.filename
    })

    try {
        blog = await blog.save()

        res.redirect(`pin/${blog._id}`)
    } catch (error) {
        console.log(error);
    }
})

router.get('/edit/:id', async (req, res) => {
    console.log(req.user)
    let blog = await Blog.findById(req.params.id)
    // console.log(req.user.email.trim() == blog.author.trim());
    // console.log(req.user.email);
    console.log(blog.author);
    if (req.user !== undefined && req.user.email.trim() == blog.author.trim()) {
        res.render('edit', { blog: blog })

    } else {
        res.redirect('/blog')
    }
})


router.post('/:id', async (req, res) => {
    let blog = await Blog.findById(req.params.id)
    let newBlog = blog
    newBlog.title = req.body.title
    console.log(blog);
    console.log(newBlog);

    try {
        const result = await blog.updateOne(blog, newBlog)
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
        res.redirect(`/pin/${blog._id}`)

    } catch (error) {
        console.log(error);
        // res.redirect(`/seblogs/edit/${blog._id}`, { blog: blog })
        // console.log(newBlog)
    }
})

router.post('/delete/:id', async (req, res) => {
    let blog = await Blog.findById(req.params.id)

    if (req.user !== undefined && req.user.email.trim() == blog.author.trim()) {
        await Blog.findOneAndDelete(req.params.id)
        res.redirect('/blog')
    } else {
        res.redirect('/blog')
    }
    // await Blog.findOneAndDelete(req.params.id)

    // res.redirect('/blog')
})

module.exports = router