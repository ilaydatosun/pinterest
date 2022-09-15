const axios = require("axios")

const Blog = require('./../model/postModel')

// const search = async (req, res) => {
//     const searchWord = req.body.search
//     try {
//         const blogAPI = await axios.get('http://127.0.0.1:3001/api/posts?search=' + searchWord)
//         res.render('./posts/index', { posts: blogAPI.data })
//     } catch (err) {
//         console.log(err.response.data)
//         console.log(err.response.status)
//         console.log(err.response.header)
//         res.json({
//             message: "Hata " + err.response.data
//         })
//     }
// }

const allPosts = async (req, res) => {
    try {
        const blogAPI = await axios.get('http://127.0.0.1:3001/api/posts')
        blogAPI.data.sort(() => Math.random() - 0.5);
        // console.log(req.user);
        res.render('./posts/index', { user: req.user, posts: blogAPI.data })
        // res.send(blogAPI.data)
    } catch (err) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.header)
        res.json({
            message: "Hata " + err.response.data
        })
    }
}



const newPost = async (req, res) => {
    const blogs = await Blog.find().sort({ timeCreated: 'desc' })
    res.render('index', { blogs: blogs , user: req.user})
}


const onePost = async (req, res) => {
    const postID = req.params.postID
    try {
        const blogAPI = await axios.get('http://127.0.0.1:3001/api/posts')
        const onePost = await axios.get('http://127.0.0.1:3001/api/posts/' + postID)
        // console.log(onePost.data);
        const others = blogAPI.data.filter((item) => {
            return item._id !== onePost.data._id
        })
        others.sort(() => Math.random() - 0.5)

        res.render('./posts/post', { user: req.user, post: onePost.data, posts: others })
    } catch (err) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.header)
        res.json({
            message: "Hata " + err.response.data
        })
    }
}

module.exports = { allPosts, onePost, newPost }
