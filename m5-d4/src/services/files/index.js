import express from "express";
import multer from "multer";
import { saveAuthorPicture } from "../../lib/fs-tools.js";

const filesRouter = express.Router()

filesRouter.post("/uploadSingle", multer().single("uploadAvatar"), async (req, res, next) => {
    try {
        await saveAuthorPicture(req.file.originalname, req.file.buffer)
        console.log(req.file)
        res.send("OK")
    } catch (error) {
        next(error)
    }
})

export default filesRouter