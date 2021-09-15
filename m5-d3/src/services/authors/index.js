import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import express from "express"; 

const authorsJsonPath = join(dirname(fileURLToPath(import.meta.url)),"authors.json")
const getAuthors = () => JSON.parse(fs.readFileSync(authorsJsonPath))
const writeAuthors = (contentData)=> fs.writeFileSync(authorsJsonPath, JSON.stringify(contentData))

const authorsRouter = express.Router()

// const filePath = fileURLToPath(import.meta.url)
// const folderPath = dirname(filePath)
// const jsonFilePath = join(folderPath, "authors.json")


// GET /authors
authorsRouter.get("/", (request, response) => {
    const authors = getAuthors()
    console.log(authors)

    response.send(authors)
})

// GET /authors/123
authorsRouter.get("/:authorId", (request, response) => {
    const authors = getAuthors()
    const author = authors.find(author => author.id === request.params.authorId)
    response.send(author)
})

// POST /authors
authorsRouter.post("/", (request, response) => {
    const newAuthor = {...request.body, id: uniqid()}
    // console.log(newAuthor)
    const authors = getAuthors()
    authors.push(newAuthor)
    writeAuthors(authors)
    response.status(201).send(newAuthor)
})

// PUT /authors/123
authorsRouter.put("/:authorId", (request, response) => {
    const authors = getAuthors()
    const index = authors.findIndex(author => author.id === req.params.authorId)

    const authorToModify = authors[index]
    const updatedFields = request.body

    const updatedAuthor = { ...authorToModify, ...updatedFields }

    authors[index] = updatedAuthor

    writeAuthors(authors)

    response.send(updatedAuthor)
})

// DELETE /authors/123
authorsRouter.delete("/:authorId", (request, response) => {
    const authors = getAuthors()
    const remainingAuthors = authors.filter(author => author.id !== request.params.authorId)
    writeAuthors(remainingAuthors)
    response.status(204).send()
})

export default authorsRouter