import express from "express";
import authorsRouter from "./services/authors/index.js";
import blogPostsRouter from "./services/posts/index.js";
import listEndpoints from "express-list-endpoints";
// import cors from "cors";


const server = express()
const port = 3001

// ✨ ✨
server.use(express.json())
// server.use(cors())

server.use("/authors", authorsRouter)
server.use("/blogPosts", blogPostsRouter)
console.table(listEndpoints(server))


server.listen(port, () => {
    console.log(`Server running on ${port}`)
})
