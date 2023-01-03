import { Type, Static } from "@sinclair/typebox";

export const baseUserSchema = Type.Object({
  id: Type.String(),
  created_at: Type.String(),
  email: Type.Optional(Type.String()),
  phone: Type.Optional(Type.String()),
  confirmed_at: Type.Optional(Type.String()),
  email_confirmed_at: Type.Optional(Type.String()),
  phone_confirmed_at: Type.Optional(Type.String()),
});

export const postUserSchema = Type.Object({
  name: Type.String({ minLength: 3 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  password2: Type.String({ minLength: 8 }),
});

export type BaseUser = Static<typeof baseUserSchema>;
export type PostUser = Static<typeof postUserSchema>;
