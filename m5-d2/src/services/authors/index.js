// authors CRUD --> url = http://localhost:3001/authors

import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

// Create a Router --> import express that will give me express.Router()
import express from "express"; 
const authorsRouter = express.Router()

const filePath = fileURLToPath(import.meta.url)
const folderPath = dirname(filePath)
const jsonFilePath = join(folderPath, "authors.json")

// Route n.1 -> GET /authors
authorsRouter.get("/", (request, response) => {
    const authors = JSON.parse(fs.readFileSync(jsonFilePath))
    // console.log(authors)
    response.send(authors)
})

// Route n.1 -> GET /authors/123
authorsRouter.get("/:authorId", (request, response) => {
    const authors = JSON.parse(fs.readFileSync(jsonFilePath))

    const author = authors.find(author => author.id === request.params.authorId)
    response.send(author)
})

// Route n.1 -> POST /authors
authorsRouter.post("/", (request, response) => {
    const newAuthor = {...request.body, id: uniqid()}
    // console.log(newAuthor)

    fs.writeFileSync(jsonFilePath, JSON.stringify(authors))
    response.status(201).send({id: newAuthor.id})
})

// Route n.1 -> PUT /authors/123
authorsRouter.put("/:authorId", (request, response) => {
    response.send("I am the PUT route")
})

// Route n.1 -> DELETE /authors/123
authorsRouter.delete("/:authorId", (request, response) => {
    response.send("I am the DELETE route")
})

export default authorsRouter