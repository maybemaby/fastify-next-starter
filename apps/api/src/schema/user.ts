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

export type BaseUser = Static<typeof baseUserSchema>;
