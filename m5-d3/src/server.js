import express from "express";
import authorsRouter from "./services/authors/index.js";
import blogPostsRouter from "./services/posts/index.js";
import listEndpoints from "express-list-endpoints";
import { badRequest, forbidden, notFound, serverError } from "./errorHandlers.js";
// import cors from "cors";


const server = express()
const port = 3001

// ✨ ✨
server.use(express.json())
// server.use(cors())

server.use("/authors", authorsRouter)
server.use("/blogPosts", blogPostsRouter)
console.table(listEndpoints(server))

// error handlers
server.use(badRequest)
server.use(forbidden)
server.use(notFound)
server.use(serverError)


server.listen(port, () => {
    console.log(`Server running on ${port}`)
})
