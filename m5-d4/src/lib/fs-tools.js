// file for my file path logic
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

// import { readJSON, writeJSON } from "fs-extra"; NO!
const { readJSON, writeJSON } = fs

// need to go a folder up -> data (sibling folder) + join it with authors / posts files
const dataPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const authorsJson = join(dataPath, "authors.json")
const postsJson = join(dataPath, "posts.json")



// returning promises --> need to be awaited
export const getAuthors = () => readJSON(authorsJson) 
export const saveAuthors = (fileContent) => writeJSON(authorsJson, fileContent)

export const getPosts = () => readJSON(postsJson)
export const savePosts = (fileContent) => writeJSON(postsJson, fileContent)

