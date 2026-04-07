import { z } from 'zod'

export const addProductSchema = z.object({
    productName: z
        .string()
        .trim()
        .min(1, "Product name is required")
        .max(100, "Product name must be less than 100 characters"),

    productCategory: z
        .string()
        .trim()
        .min(1, "Product category is required")
        .max(50, "Product category must be less than 50 characters"),

    productDescription: z
        .string()
        .trim()
        .min(1, "Product description is required")
        .max(255, "Product description must be less than 255 characters"),

    productPrice: z
        .coerce.number()
        .min(0.01, "Product price must be a positive number"),

    stock: z
        .coerce.number()
        .min(0, "Stock cannot be negative")
        .default(0),
})

