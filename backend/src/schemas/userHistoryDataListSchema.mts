import { z } from "zod";

// objects are at most 20
const userHistoryDataListSchema = z
  .array(
    z.object({
      recommendedFoods: z.array(z.string()),
      missingNutrients: z.array(z.string()),
      score: z.number(),
      createdAt: z.date(),
    })
  )
  .max(20, "The number of objects must be less than or equal to 20");

export default userHistoryDataListSchema;
