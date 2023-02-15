import { FastifyPluginCallback } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { baseUserSchema, postUserSchema } from "../../../schema/user";
import { createUser } from "../../../services/userService";

export const userRouter: FastifyPluginCallback = (fastify, opts, done) => {
  const instance = fastify.withTypeProvider<TypeBoxTypeProvider>();

  instance.register((_fastify, opts, done) => {
    const _instance = _fastify.withTypeProvider<TypeBoxTypeProvider>();

    _instance.addHook("onRequest", _instance.authorize);

    _instance.get(
      "/me",
      {
        schema: {
          response: {
            200: baseUserSchema,
          },
        },
      },
      async (req, res) => {
        const user = req.user;
        return user;
      }
    );

    done();
  });

  instance.post(
    "/register",
    {
      schema: {
        body: postUserSchema,
      },
    },
    async (req, reply) => {
      const input = req.body;

      if (req.user) {
        return reply.badRequest("Already logged in");
      }

      if (input.password !== input.password2) {
        return reply.badRequest("Passwords do not match");
      }

      const { data, error } = await instance.supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            name: input.name,
          },
        },
      });

      if (error) {
        req.log.error(error, "Error creating user with Supabase");
        return reply.badRequest(error.message);
      }

      try {
        if (!data.user) {
          throw new Error("No user returned from supabase");
        }
        await createUser({
          ...input,
          provider: "supabase",
          providerId: data.user.id,
        });
      } catch (err) {
        req.log.error(err, "Could not create user internal");
        return reply.badRequest("Could not create user");
      }

      return data;
    }
  );

  done();
};
