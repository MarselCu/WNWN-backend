import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create customer
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: hashedPassword,
      phone: "081234567890",
    },
  });

  // Create store owner
  const storeOwner = await prisma.store_owner.create({
    data: {
      name: "Alice Smith",
      email: "alice@example.com",
      password: hashedPassword,
      phone: "081234567891",
      stores: {
        create: {
          name: "Alice's Bakery",
          email: "store@example.com",
          phone: "081234567892",
          location: "Jakarta, Indonesia",
          category: "Bakery",
          admins: {
            create: {
              name: "Bob Admin",
              email: "admin@example.com",
              password: hashedPassword,
              phone: "081234567893",
            },
          },
          products: {
            create: {
              name: "Chocolate Cake",
              description: "Delicious chocolate cake with rich flavor",
              price: 150000,
              stock: 10,
              expiration_date: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
          },
        },
      },
    },
  });

  // Get store and product
  const store = await prisma.store.findFirst({ where: { owner_id: storeOwner.id } });
  const product = await prisma.product.findFirst({ where: { store_id: store?.id } });

  if (!store || !product) throw new Error("Store or Product not created properly");

  // Create first order (Completed)
  const order1 = await prisma.order.create({
    data: {
      customer_id: customer.id,
      store_id: store.id,
      status: "completed",
      total_price: product.price,
      order_details: {
        create: {
          product_id: product.id,
          quantity: 1,
          subtotal: product.price,
        },
      },
      payment: {
        create: {
          method: "Credit Card",
          status: "success",
          transaction_id: "txn_123456",
          amount: product.price,
        },
      },
    },
  });

  // Create second order (Pending Payment)
  const order2 = await prisma.order.create({
    data: {
      customer_id: customer.id,
      store_id: store.id,
      status: "pending",
      total_price: product.price,
      order_details: {
        create: {
          product_id: product.id,
          quantity: 1,
          subtotal: product.price,
        },
      },
      payment: {
        create: {
          method: "Bank Transfer",
          status: "pending",
          transaction_id: "txn_654321",
          amount: product.price,
        },
      },
    },
  });

  // Create a review for the store
  await prisma.review.create({
    data: {
      customer_id: customer.id,
      store_id: store.id,
      rating: 5,
      comment: "Great store! The cake was amazing.",
    },
  });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error inserting seed data: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
