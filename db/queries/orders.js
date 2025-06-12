import db from "#db/client";
import bcrypt from "bcrypt";
// import faker from "faker";

export async function createOrder(userId, productId, quantity) {
  const sql = `INSERT INTO orders(user_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
  const {
    rows: [order],
  } = await db.query(sql, [userId, productId, quantity]);
  return order;
}

export async function getOrderById(id) {
  const sql = `SELECT * FROM orders WHERE id=$1`;
  const {
    rows: [order],
  } = await db.query(sql, [id]);
  if (!order) return null;

  return order;
}

export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id=$1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
