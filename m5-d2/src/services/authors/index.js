// authors CRUD --> url = http://localhost:3001/authors

// Create a Router --> import express that will give me express.Router()
import express from "express"; 
const authorsRouter = express.Router()

// Route n.1 -> GET /authors
authorsRouter.get("/")

// Route n.1 -> GET /authors/123
authorsRouter.get("/:authorId")

// Route n.1 -> POST /authors
authorsRouter.post("/")

// Route n.1 -> PUT /authors/123
authorsRouter.put("/:authorId")

// Route n.1 -> DELETE /authors/123
authorsRouter.delete("/:authorId")

export default authorsRouter