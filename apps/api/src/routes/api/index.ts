import { Type } from "@sinclair/typebox";
import { FastifyPluginCallback } from "fastify";
import { userRouter } from "./users/userRouter";

// Root api router,
export const apiRouter: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: Type.Object(
            {
              version: Type.String(),
            },
            {
              description: "API Information",
            }
          ),
        },
      },
    },
    async (_req, _res) => {
      return { version: "1" };
    }
  );

  // Register any api routes here:
  // Delete this example
  fastify.register(userRouter, { prefix: "/users" });
  done();
};
