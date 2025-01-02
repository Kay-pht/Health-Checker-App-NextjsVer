import { z } from "zod";

const envSchema = z.object({
  openaiApiKey: z.string(),
  port: z.coerce.number(), // 変更点: number型に強制変換
  mongoUri: z.string(),
  serviceAccountKey: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  frontendBaseUrl: z.string(),
  frontendDomain: z.string(),
  rolePrompt: z.string(),
  taskPrompt: z.string(),
});

export default envSchema;

export type envSchemaType = z.infer<typeof envSchema>;
