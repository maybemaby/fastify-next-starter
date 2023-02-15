import { Type, Static } from "@sinclair/typebox";

export const baseUserSchema = Type.Object({
  aud: Type.String(),
  sub: Type.String(),
  session_id: Type.String(),
  email: Type.String(),
  phone: Type.String(),
  role: Type.String(),
  exp: Type.Number(),
  aal: Type.String(),
});

export const postUserSchema = Type.Object({
  name: Type.String({ minLength: 3 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  password2: Type.String({ minLength: 8 }),
});

export type BaseUser = Static<typeof baseUserSchema>;
export type PostUser = Static<typeof postUserSchema>;
