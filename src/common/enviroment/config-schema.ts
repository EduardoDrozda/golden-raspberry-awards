import { z } from 'zod';

export const envSchema = z.object({
  APP_PORT: z.coerce.number().default(8081),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});



export type EnvSchema = z.infer<typeof envSchema>;

export const validate = (config: Record<string, unknown>) => envSchema.parse(config)