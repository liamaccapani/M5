import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import express, { response } from "express";

const postsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json")

const getPosts = () => JSON.parse(fs.readFileSync(postsJsonPath))
const rewritePosts = (contentData) => fs.writeFileSync(postsJsonPath, JSON.stringify(contentData))
const blogPostsRouter = express.Router()

blogPostsRouter.get("/", (req, res, next) => {
    try {
        const posts = getPosts()
        res.send(posts) 
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.get("/:postId", (req, res, next) => {
    try {
        // find author of post and attach the post 
        const posts = getPosts()
        const post = posts.find(post => post.id === req.params.postId)
        if(post){
            res.send(post)

        } else {
            next(createHttpError(404, `No post with id ${req.params.postId}`))
        }
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.post("/", (req, res, next) => {
    try {    
        //const {author} = is in req.body;
        //read author json  find author by id 
        // and if author exists insert post
        
        const posts = getPosts()
        const newPost = {...req.body, _id: uniqid(), createdAt: new Date(), "content":"HTML"}
        posts.push(newPost)
        rewritePosts(posts)
        res.status(201).send("Post created")
    } catch (error) {
        next(error)
    }

})

// blogPostsRouter.put("/:postId", (req, res, next) => {
//     try {
//         const posts = getPosts()
//         const index = posts.findIndex(post => post._id === req.params.postId)
//         const updatedPost = { ...posts[index], ...req.body }
//         posts[index] = updatedPost
//         rewritePosts(posts)
//         res.send(updatedPost)   
//     } catch (error) {
//         next(error)
//     }
// })


blogPostsRouter.delete("/:postId", (req, res, next) => {
    try {
        const posts = getPosts()
        const remainingPosts = posts.filter(post => post._id !== req.params.postId)
        rewritePosts(remainingPosts)
        res.status(204).send()   
    } catch (error) {
        next(error)
    }
})


export default blogPostsRouter