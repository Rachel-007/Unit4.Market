import express from "express";
const router = express.Router();
export default router;

import { createProducts, getProducts } from "#db/queries/products";
import requireBody from "#middleware/requireBody";

router.post("/", requireBody, async (req, res) => {
  const { title, description, price } = req.body;
  const product = await createProducts(title, description, price);
  res.status(201).json(product);
});

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.json(products);
});
