import express from "express";
import authorsRouter from "./services/authors/index.js";
import blogPostsRouter from "./services/posts/index.js";
import filesRouter from "./services/files/index.js";
import listEndpoints from "express-list-endpoints";
import { join } from "path";
import { badRequest, forbidden, notFound, serverError } from "./errorHandlers.js";
import cors from "cors";


const server = express()
const port = process.env.PORT || 3001
const publicFolderPath = join(process.cwd(), "public")

// CORS
const whiteList = [process.env.FE_LOCAL_URL, process.env.FE_DEPLOYED_URL]
const corsOptions = {
    origin: function(origin, next){
        if(!origin || whiteList.indexOf(origin) !== -1) {
            next(null, true)
        } else {
            next(new Error(`Forbidden origin: ${origin}`))
        }
    }
}


// GLOBAL MIDDLEWARES
server.use(cors(corsOptions))
server.use(express.json())
server.use(express.static(publicFolderPath))


// ENDPOINTS
server.use("/authors", authorsRouter)
server.use("/blogPosts", blogPostsRouter)
server.use("/files", filesRouter)
console.table(listEndpoints(server))

// ERROR HANDLERS
server.use(badRequest)
server.use(forbidden)
server.use(notFound)
server.use(serverError)


server.listen(port, () => {
    console.log(`Server running on ${port}`)
})
