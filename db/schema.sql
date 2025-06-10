DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS orders_products CASCADE;
DROP TABLE IF EXISTS products;
-- This file defines the schema for the database.


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  note TEXT,
  user_id INTEGER NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL NOT NULL
);

CREATE TABLE orders_products (
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);

-- Ref: users.id < orders.user_id [delete: cascade]
CREATE INDEX idx_orders_products_order_id ON orders_products(order_id);
CREATE INDEX idx_orders_products_product_id ON orders_products(product_id);



-- Ref: users.id < orders.user_id [delete: cascade]
-- Ref: orders.id < orders_products.order_id [delete: cascade]
-- Ref: products.id < orders_products.product_id [delete: cascade]

