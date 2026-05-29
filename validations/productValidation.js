import { z } from "zod";

export const productValidationSchema = z
  .object({
    productName: z.string(),

    sku: z.string(),

    category: z.string(),

    price: z.number(),

    cost: z.number(),

    stockQuantity: z.number().min(0),

    reorderLevel: z.number(),
  })
  .refine(
    (data) => data.price >= data.cost,
    {
      message:
        "Price cannot be lower than cost",
      path: ["price"],
    }
  );