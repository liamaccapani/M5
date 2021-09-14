// authors CRUD --> url = http://localhost:3001/authors

// Create a Router --> import express that will give me express.Router()
import express from "express"; 
const authorsRouter = express.Router()

// Route n.1 -> GET /authors
authorsRouter.get("/", (request, response) => {
    response.send("I am the GET route")
})

// Route n.1 -> GET /authors/123
authorsRouter.get("/:authorId", (request, response) => {
    response.send("I am the GET + ID route")
})

// Route n.1 -> POST /authors
authorsRouter.post("/", (request, response) => {
    response.send("I am the POST route")
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