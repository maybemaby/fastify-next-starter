import { FastifyPluginCallback } from "fastify";
import { Type } from "@sinclair/typebox";

export const healthRoute: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get(
    "/heartbeat",
    {
      schema: {
        response: {
          200: Type.Object(
            {
              health: Type.String(),
            },
            { description: "Health check" }
          ),
        },
      },
    },
    async (_req, res) => {
      res.statusCode = 200;
      return {
        health: "Good",
      };
    }
  );
  done();
};
