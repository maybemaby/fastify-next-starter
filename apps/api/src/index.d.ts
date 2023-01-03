import type { SupabaseClient, User } from "@supabase/supabase-js";

declare module "fastify" {
  interface FastifyInstance {
    supabase: SupabaseClient;
    authorize: (req: FastifyRequest, res: FastifyReply) => Promise<boolean>;
  }

  interface FastifyRequest {
    user: null | User;
  }
}
