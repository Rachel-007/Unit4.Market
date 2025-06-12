import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

import { createUser } from "#db/queries/users";
import { createOrder } from "#db/queries/orders";
import { createProducts } from "#db/queries/products";

async function seed() {
  const user = await createUser({ username: "testuser", password: "password" });
  const order = await createOrder({
    userId: 1,
    date: new Date(),
    note: "First order",
  });
  const product = await createProducts({
    title: "Test Product",
    description: "This is a test product",
    price: 9.99,
  });
}
