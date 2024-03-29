import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const Env = Type.Object({
  NODE_ENV: Type.String({ default: "development" }),
  PORT: Type.Number({ default: 5000 }),
  HOST: Type.String({ default: "localhost" }),
  // Accept env variable allowed origins for cors separated by commas
  ALLOWED_ORIGINS: Type.String({}),
  SUPABASE_URL: Type.String(),
  SUPABASE_SERVICE_KEY: Type.String(),
  SUPABASE_JWT_SECRET: Type.String(),
});

export const env = Value.Cast(Env, process.env);
