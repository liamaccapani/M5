import createHttpError from "http-errors";
import express from "express";
import { getAuthors, saveAuthors, saveAuthorPicture } from "../../lib/fs-tools.js";
import uniqid from "uniqid";
import multer from "multer";

const authorsRouter = express.Router();

authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    console.log(authors);
    res.send(authors);
  } catch (error) {
    next(error);
  }
});


authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const author = authors.find((author) => author._id === req.params.authorId);
    if (author) {
      res.send(author);
    } else {
      next(
        createHttpError(404), `Invalid Author id, no author with _id:${req.params.authorId}`
      );
    }
  } catch (error) {
    next(error);
  }
});


authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = {
      ...req.body,
      _id: uniqid(),
      createdAt: new Date(),
      avatar: `https://ui-avatars.com/api/?name=${req.body.name}+${req.body.surname}`,
    };
    const authors = await getAuthors();
    authors.push(newAuthor);
    saveAuthors(authors);
    res.status(201).send(newAuthor);
  } catch (error) {
    next(error);
  }
});


// change author TEXT
authorsRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const authorIndex = authors.findIndex(
      (author) => author._id === req.params.authorId
    );
    if (!authorIndex === -1) {
      next(
        createHttpError(404),
        `Invalid Author id, no author with _id:${req.params.authorId}`
      );
    } else {
      let previousAuthorData = authors[authorIndex];
      const changedAuthor = {
        ...previousAuthorData,
        ...req.body,
        updatedAt: new Date(),
        _id: req.params.authorId,
      };

      previousAuthorData = changedAuthor;
      await saveAuthors(authors);
      res.send(changedAuthor);
    }
  } catch (error) {
    next(error);
  }
});


// change AVATAR ONLY
authorsRouter.put("/:authorId/avatar", multer().single("avatar"), async(req, res, next) => {
  try {
    // ***************************** \\
    const { originalname, buffer } = req.file
    const extension = extname(originalname)
    const fileName = `${req.params.authorId}${extension}`
    const link = `http://localhost:3001/${fileName}`
    req.file = link
    saveAuthorPicture(fileName, buffer)
    // ***************************** \\

    const authors = await getAuthors()
    const authorIndex = authors.findIndex(
      (author) => author._id === req.params.authorId);
      
    if (!authorIndex === -1) {
      next(
        createHttpError(404),
        `Invalid Author id, no author with _id:${req.params.authorId}`
      );
    } else {
      let previousAuthorData = authors[authorIndex];
      const changedAuthor = {
        ...previousAuthorData,
        // ...req.body, -> no need because I'm only changing the avatar
        avatar: req.file,
        updatedAt: new Date(),
        _id: req.params.authorId,
      };

      previousAuthorData = changedAuthor;
      await saveAuthors(authors);
      res.send(changedAuthor);
    }
  } catch (error) {
    
  }
})


authorsRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    const remainingAuthors = authors.filter(
      (author) => author._id !== req.params.authorId
    );
    saveAuthors(remainingAuthors);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
