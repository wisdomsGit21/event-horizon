import  {z} from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DB_HOST: z.string().nonempty("DB_HOST is required"),
  DB_PORT: z.string().transform(Number).default("5432"),
  DB_USER: z.string().nonempty("DB_USER is required"),
  DB_PASS: z.string().nonempty("DB_PASS is required"),
  DB_NAME: z.string().nonempty("DB_NAME is required"),
});

export type EnvSchema = z.infer<typeof envSchema>;