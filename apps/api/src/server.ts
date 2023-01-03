import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { build } from "./app";
import { env } from "./config/env";
import { config } from "./config/config";
import { apiRouter } from "./routes/api";

const app = build({
  logger: config[env.NODE_ENV].logger,
});

app.register(cors, {
  origin: ["*", ...env.ALLOWED_ORIGINS.split(",")],
  credentials: true,
});

app.register(helmet);

// Returns swagger spec JSON when not in production
if (env.NODE_ENV !== "production") {
  app.get("/spec", async (_req, _res) => {
    return app.swagger({ yaml: true });
  });
}

app.register(apiRouter, { prefix: "/api" });

if (env.HOST) {
  app.listen(
    {
      port: env.PORT,
      host: env.HOST,
    },
    (err, _address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );
} else {
  app.listen(
    {
      port: env.PORT,
    },
    (err, _address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    }
  );
}
