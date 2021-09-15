import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import express, { response } from "express";

const postsJsonPath = join(dirname(fileURLToPath(import.meta.url)), "posts.json")

const getPosts = () => JSON.parse(fs.readFileSync(postsJsonPath))
const writePosts = (contentData) => fs.writeFileSync(postsJsonPath, JSON.stringify(contentData))
const blogPostsRouter = express.Router()

blogPostsRouter.get("/", (req, res) => {
    try {
        const posts = getPosts()
        res.send(posts) 
    } catch (error) {
        
    }
})

blogPostsRouter.get("/:postId", (req, res) => {
    try {
        const posts = getPosts()
        const post = posts.find(post => post.id === req.params.postId)
        res.send(post)

    } catch (error) {
        
    }
})

blogPostsRouter.post("/", (req, res) => {
    try {
        const posts = getPosts()
        const newPost = {...req.body, _id:uniqid(), createdAt: new Date(), "content":"HTML"}
        posts.push(newPost)
        writePosts(posts)
        res.status(201).send("Post created")
    } catch (error) {
        
    }

})

blogPostsRouter.put("/:postId", (req, res) => {
    try {
        const posts = getPosts()
        const index = posts.findIndex(post => post._id === req.params.postId)
        const updatedPost = { ...posts[index], ...req.body }
        posts[index] = updatedPost
        writePosts(posts)
        res.send(updatedPost)   
    } catch (error) {
        
    }
})


blogPostsRouter.delete("/:postId", (req, res) => {
    try {
        const posts = getPosts()
        const remainingPosts = posts.filter(post => post._id !== req.params.postId)
        writePosts(remainingPosts)
        res.status(204).send()   
    } catch (error) {
        
    }
})


export default blogPostsRouter