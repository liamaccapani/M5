// file for my file path logic
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

// import { readJSON, writeJSON } from "fs-extra"; NO!
const { readJSON, writeJSON, writeFile} = fs

// need to go a folder up -> data (sibling folder) + join it with authors / posts files
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const publicFolderPath = join(process.cwd(), "public")

const authorsJson = join(dataFolderPath, "authors.json")
const postsJson = join(dataFolderPath, "posts.json")



// returning promises --> need to be awaited
export const getAuthors = () => readJSON(authorsJson) 
export const saveAuthors = (fileContent) => writeJSON(authorsJson, fileContent)

export const getPosts = () => readJSON(postsJson)
export const savePosts = (fileContent) => writeJSON(postsJson, fileContent)

export const saveAuthorPicture = (name, bufferContent) => writeFile(join(publicFolderPath, name), bufferContent)