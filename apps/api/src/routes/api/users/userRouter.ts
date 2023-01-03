import { FastifyPluginCallback } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { baseUserSchema } from "../../../schema/user";

export const userRouter: FastifyPluginCallback = (fastify, opts, done) => {
  const instance = fastify.withTypeProvider<TypeBoxTypeProvider>();

  instance.addHook("onRequest", instance.authorize);

  instance.get(
    "/me",
    {
      schema: {
        response: {
          200: baseUserSchema,
        },
      },
    },
    async (req, res) => {
      const user = req.user!;
      return user;
    }
  );

  done();
};
