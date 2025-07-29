import { z } from "zod";

export const productFormSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name must be at most 255 characters." }),

  price: z.coerce
    .number()
    // ensures not NaN/Infinity after coercion
    .refine((v) => Number.isFinite(v), { message: "Price must be a valid number." })
    .min(1, { message: "Price must be at least 1." })
    .max(1000, { message: "Price must be at most 1000." }),

  categoryId: z.coerce
    .number()
    .int({ message: "Please select a valid category." })
    .min(1, { message: "Please select a category." }),
});


export type ProductFormData = z.infer<typeof productFormSchema>;
