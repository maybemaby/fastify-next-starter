import { User } from "@supabase/supabase-js";
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

const authorization: FastifyPluginCallback = (fastify, opts, done) => {
  // Decorate requests with a user instance, defaults to null
  fastify.decorateRequest("user", null);

  // Add an authorize method to the fastify instance
  fastify.decorate("authorize", authorize);

  async function authorize(req: FastifyRequest, res: FastifyReply) {
    const token = extractToken(req);
    if (!token) {
      // Using fastify-sensible response helpers
      return false;
    }
    const { allowed, err, user } = await userAllowed(token);
    if (!allowed) {
      return false;
    } else if (user) {
      req.user = user;
      return true;
    }
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
