import db from "#db/client";
import bcrypt from "bcrypt";
// import faker from "faker";

export async function createProducts({ title, description, price }) {
  const sql = `INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *`;
  const {
    rows: [product],
  } = await db.query(sql, [title, description, price]);
  return product;
}

export async function getProductById(id) {
  const sql = `SELECT * FROM products WHERE id=$1`;
  const {
    rows: [product],
  } = await db.query(sql, [id]);
  if (!product) return null;

  return product;
}

export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id=$1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
