import { z } from "zod";

// already tested in the backend
// createdAt should be transformed to Date to maintain consistency
const userHistoryDataListSchema = z
  .array(
    z.object({
      recommendedFoods: z.array(z.string()),
      missingNutrients: z.array(z.string()),
      score: z.number(),
      createdAt: z.string().transform((str) => new Date(str)),
    })
  )
  .max(20, "The number of objects must be less than or equal to 20");

export default userHistoryDataListSchema;
