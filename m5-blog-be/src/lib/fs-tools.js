// file for my file path logic
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

// import { readJSON, writeJSON } from "fs-extra"; NO!
const { readJSON, writeJSON, writeFile} = fs

// need to go a folder up -> data (sibling folder) + join it with authors / posts files
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

// 

const authorsJson = join(dataFolderPath, "authors.json")
const postsJson = join(dataFolderPath, "posts.json")



// returning promises --> need to be awaited

// -AUTHORS
export const getAuthors = () => readJSON(authorsJson) 
export const saveAuthors = (fileContent) => writeJSON(authorsJson, fileContent)


// -POSTS
export const getPosts = () => readJSON(postsJson)
export const savePosts = (fileContent) => writeJSON(postsJson, fileContent)


// FILES
// const publicFolderPath = join(process.cwd(), "public")
// a) AVATAR
const publicFolderAuthorsPath = join(process.cwd(), "public/img/authors")
export const saveAuthorPicture = (name, bufferContent) => writeFile(join(publicFolderAuthorsPath, name), bufferContent)

// b) COVER IMG
const publicFolderPostsPath = join(process.cwd(), "public/img/posts")
export const saveCoverImage = (name, bufferContent) => writeFile(join(publicFolderPostsPath, name), bufferContent)