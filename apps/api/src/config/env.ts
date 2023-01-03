import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const Env = Type.Object({
  NODE_ENV: Type.String(),
  PORT: Type.Number({ default: 5000 }),
  HOST: Type.String({ default: "localhost" }),
});

export const env = Value.Cast(Env, process.env);
