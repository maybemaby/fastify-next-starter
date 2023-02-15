import type { SupabaseClient, UserAppMetadata, UserMetadata } from "@supabase/supabase-js";

interface SupabaseJWTPayload {
  aud: string;
  sub: string;
  session_id: string;
  email: string;
  exp: number;
  phone: string;
  role: string;
  user_metadata: UserMetadata;
  app_metadata: UserAppMetadata;
  aal: string;
}

declare module "fastify" {
  interface FastifyInstance {
    supabase: SupabaseClient;
    authorize: (req: FastifyRequest, res: FastifyReply) => Promise<boolean>;
  }

  interface FastifyRequest {
    user: SupabaseJWTPayload;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      payload: SupabaseJWTPayload;
    };
    user: SupabaseJWTPayload;
  }
}