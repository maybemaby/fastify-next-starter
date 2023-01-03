import fastify, { FastifyServerOptions } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import sensible from "@fastify/sensible";
import swagger from "@fastify/swagger";
import { healthRoute } from "./routes/health";

export const build = (opts?: FastifyServerOptions) => {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  app.register(swagger, {
    openapi: {
      info: {
        title: "Fastify Template",
        description: "Swagger Spec for Fastify web API",
        version: "0.1.0",
      },
      servers: [{ url: "http://localhost:5000" }],
    },
    refResolver: {
      buildLocalReference(json, baseUri, fragment, i) {
        return json.$id?.toString() || `def-${i}`;
      },
    },
  });

  app.register(sensible);
  app.register(healthRoute);
  return app;
};
