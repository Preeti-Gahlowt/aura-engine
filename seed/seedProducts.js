import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import { faker } from "@faker-js/faker";

import Product from "../models/Product.js";

const categories = [
  "Electronics",
  "Apparel",
  "Furniture",
  "Beauty",
  "Sports",
];

const generateProducts = () => {
  const products = [];

  for (let i = 0; i < 50000; i++) {
    const price = Number(
      faker.commerce.price({
        min: 20,
        max: 1000,
      })
    );

    const cost = Number(
      faker.commerce.price({
        min: 10,
        max: price,
      })
    );

    products.push({
      productName: faker.commerce.productName(),

      sku: faker.string.uuid(),

      category:
        categories[
          Math.floor(
            Math.random() * categories.length
          )
        ],

      price,

      cost,

      stockQuantity: faker.number.int({
        min: 0,
        max: 500,
      }),

      reorderLevel: faker.number.int({
        min: 5,
        max: 50,
      }),
    });
  }

  return products;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected");

    await Product.deleteMany();

    console.log("Old Data Removed");

    const products = generateProducts();

    await Product.insertMany(products);

    console.log("50,000 Products Inserted");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();