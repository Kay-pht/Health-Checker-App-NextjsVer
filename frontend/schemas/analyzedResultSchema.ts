import { z } from "zod";

// already tested in backend
// Schema for the response from the AI
export const analyzedResultSchema = z.object({
  missingNutrients: z.array(z.string()).default(["無し"]),
  recommendedFoods: z.array(z.string()).default(["無し"]),
  score: z.number(),
});
