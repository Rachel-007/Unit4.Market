import db from "#db/client";
import bcrypt from "bcrypt";
// import faker from "faker";

export async function createUser({ username, password }) {
  console.log(username, password);
  const sql = `INSERT INTO users(username, password) VALUES($1, $2) RETURNING *`;
  const saltrounds = 10;
  const salt = await bcrypt.genSalt(saltrounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `SELECT * FROM users WHERE username = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user || !user.password) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id=$1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
