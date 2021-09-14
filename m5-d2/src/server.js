import express from "express";
import authorsRouter from "./services/authors/index.js";

const server = express()
const port = 3001

server.use("/authors", authorsRouter)

server.listen(port, () => {
    console.log(`Server running on ${port}`)
})