import express from "express";
const router = express.Router();
export default router;

import { createOrders } from "#db/queries/orders";
import requireBody from "#middleware/requireBody";

router.post("/", requireBody, async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const order = await createOrders(userId, productId, quantity);
  res.status(201).json(order);
});
