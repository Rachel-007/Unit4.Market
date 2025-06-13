import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

import { createUser } from "#db/queries/users";
import { createOrder } from "#db/queries/orders";
import { createProducts } from "#db/queries/products";

async function seed() {
  // Create a user
  const user = await createUser({ username: "testuser", password: "password" });

  // Create 10 different products
  const productsData = Array.from({ length: 10 }, (_, i) => ({
    title: `Product ${i + 1}`,
    description: `Description for product ${i + 1}`,
    price: (i + 1) * 5.0,
  }));
  const products = [];
  for (const data of productsData) {
    const product = await createProducts(data);
    products.push(product);
  }

  // Create an order for the user with at least 5 distinct products
  const order = await createOrder({
    userId: user.id || 1,
    date: new Date(),
    note: "First order with 5 products",
    products: products
      .slice(0, 5)
      .map((p) => ({ productId: p.id || p.productId, quantity: 1 })),
  });
}
