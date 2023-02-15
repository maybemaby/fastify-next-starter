import { User } from "@supabase/supabase-js";
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { env } from "../config/env";

const authorization: FastifyPluginCallback = (fastify, opts, done) => {
  // Decorate requests with a user instance, defaults to null

  fastify.register(jwt, {
    secret: env.SUPABASE_JWT_SECRET,
    verify: {
      maxAge: 3600,
    },
    formatUser(payload) {
      return payload["payload"];
    },
  });

  // Add an authorize method to the fastify instance
  fastify.decorate("authorize", authorize);

  async function authorize(req: FastifyRequest, res: FastifyReply) {
    await req.jwtVerify({ complete: true });
    return true;
  }

  // Takes a token value from Authorization: Bearer headers returns null if not found
  function extractToken(req: FastifyRequest) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer")) {
      return null;
    }
    const [_, token] = header.split(" ");
    return token;
  }

  // Retrieves a Supabase user instance using the server client and an access token
  async function userAllowed(
    token: string
  ): Promise<{ err?: string; user?: User; allowed: boolean }> {
    const user = await fastify.supabase.auth.getUser(token);
    if (user.error) {
      return { err: user.error.message, allowed: false };
    }
    return { user: user.data.user, allowed: true };
  }

  done();
};

export default fp(authorization, { name: "authorization" });
