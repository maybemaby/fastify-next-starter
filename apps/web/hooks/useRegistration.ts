import type { Session } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postApiUsersRegister } from "../generated";

export const useRegistration = ({ redirect }: { redirect?: string }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const register = useMutation({
    mutationFn: postApiUsersRegister,
    onSuccess: (data) => {
      supabase.auth.setSession(
        (data.data as unknown as { session: Session }).session
      );
      supabase.auth.refreshSession();
      router.push(redirect || "/");
    },
  });

  return { register };
};
