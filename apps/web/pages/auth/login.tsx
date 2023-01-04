import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { LoginForm } from "~/components/LoginForm";
import type { LoginData } from "~/types";
import { useRouter } from "next/router";

const Login = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (data: LoginData) => {
    setLoading(true);
    const res = await supabase.auth.signInWithPassword(data);
    setLoading(false);
    if (!res.error) {
      router.push("/");
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default Login;
