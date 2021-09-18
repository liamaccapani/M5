import express from "express";
import authorsRouter from "./services/authors/index.js";
import blogPostsRouter from "./services/posts/index.js";
import filesRouter from "./services/files/index.js";
import listEndpoints from "express-list-endpoints";
import { join } from "path";
import { badRequest, forbidden, notFound, serverError } from "./errorHandlers.js";
import cors from "cors";


const server = express()
const port = 3001
const publicFolderPath = join(process.cwd(), "public")

server.use(cors())
server.use(express.json())
server.use(express.static(publicFolderPath))

server.use("/authors", authorsRouter)
server.use("/blogPosts", blogPostsRouter)
server.use("/files", filesRouter)
console.log(listEndpoints(server))

// error handlers
server.use(badRequest)
server.use(forbidden)
server.use(notFound)
server.use(serverError)


server.listen(port, () => {
    console.log(`Server running on ${port}`)
})
