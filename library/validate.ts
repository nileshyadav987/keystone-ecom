import { body } from "express-validator";

export const newProduct: any = [
  body("category", "Category id is required").exists().not().isEmpty(),
  body("title", "Title is required").exists().not().isEmpty(),
];