import express from "express";

import {
  getInventory,
  createProduct,
  updateProduct,
} from "../controllers/inventoryController.js";

import validate from "../middleware/validate.js";

import { productValidationSchema } from "../validations/productValidation.js";

const router = express.Router();

router.get("/", getInventory);

router.post(
  "/",
  validate(productValidationSchema),
  createProduct
);

router.put(
  "/:id",
  validate(productValidationSchema),
  updateProduct
);

export default router;