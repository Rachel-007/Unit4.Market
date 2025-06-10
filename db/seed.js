import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

import { createUser } from "#db/queries/users";
import { createOrder } from "#db/queries/orders";
import { createProduct } from "#db/queries/products";

async function seed() {
  await createUser({ username: "testuser", password: "password" });
  await createOrder({ userId: 1, date: new Date(), note: "First order" });
  await createProduct({
    title: "Test Product",
    description: "This is a test product",
    price: 9.99,
  });
}
