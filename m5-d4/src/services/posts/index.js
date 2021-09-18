import createHttpError from "http-errors";
import express from "express";
import { getPosts, savePosts } from "../../lib/fs-tools.js";
import { getAuthors, saveAuthors } from "../../lib/fs-tools.js";
import uniqid from "uniqid";

const blogPostsRouter = express.Router();

blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await getPosts();
    console.log(posts);
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/:postId", async (req, res, next) => {
  try {
    const posts = await getPosts();
    const post = posts.find((post) => post._id === req.params.postId);
    // find author of post and attach the post
    const authorId = post.author._id;
    //console.log(authorId)
    if (post && authorId) {
      res.send(post);
    } else {
      next(createHttpError(404, `Invalid post id or author id`));
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.post("/", async (req, res, next) => {
  try {
    // const {author} = is in req.body;
    //read author json  find author by id
    // const authors = await getAuthors()
    // const authorOfPost = authors.find(author => author._id === author._id)
    //and if author exists insert post
    const newPost = {
      ...req.body,
      _id: uniqid(),
      createdAt: new Date(),
      content: "HTML",
    };
    const posts = await getPosts();
    posts.push(newPost);
    await savePosts(posts);
    res.status(201).send(newPost);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.put("/:postId", async (req, res, next) => {
  try {
    const posts = await getPosts();
    const index = posts.findIndex((post) => post._id === req.params.postId);
    const updatedPost = {
      ...posts[index],
      ...req.body,
      modifiedAt: new Date(),
    };
    posts[index] = updatedPost;
    await savePosts(posts);
    res.send(updatedPost);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const posts = await getPosts();
    const remainingPosts = posts.filter(
      (post) => post._id !== req.params.postId
    );
    await savePosts(remainingPosts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
