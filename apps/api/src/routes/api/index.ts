import { Type } from "@sinclair/typebox";
import { FastifyPluginCallback } from "fastify";

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
  done();
};
