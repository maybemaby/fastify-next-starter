import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";

const supabasePlugin: FastifyPluginCallback = (fastify, opts, done) => {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_KEY must be provided");
  }
  const client = createClient(supabaseUrl, supabaseKey, {});
  fastify.decorate("supabase", client);
  done();
};

export default fp(supabasePlugin, { name: "supabase" });
