import { z } from 'zod';

export const envSchema = z.object({
  APP_PORT: z.coerce.number().default(8081),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DB_CLIENT: z.enum(['sqlite3']),
  DB_CONNECTION: z.string(),
  DB_BOOSTRAP_FILE: z.string().optional(),
});



export type EnvSchema = z.infer<typeof envSchema>;

export const validate = (config: Record<string, unknown>) => envSchema.parse(config)