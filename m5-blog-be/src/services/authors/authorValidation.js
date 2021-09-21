import { body } from "express-validator"

export const authorValidation = [
  body("name").exists().withMessage("Name is a mandatory field!").isString().withMessage('Needs to be a string'),
  body("surname").exists().withMessage("Surname is a mandatory field!").isString().withMessage('Needs to be a string'),
  body("email").exists().withMessage("Email is a mandatory field!").isEmail().withMessage("Please send a valid email!"),
  body("dateOfBirth").exists().withMessage("Date of Birth is a mandatory field!")
]