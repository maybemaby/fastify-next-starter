import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { LoginForm } from "~/components/LoginForm";
import type { LoginData } from "~/types";
import { useRouter } from "next/router";

const Login = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (data: LoginData) => {
    setLoading(true);
    const res = await supabase.auth.signInWithPassword(data);
    setLoading(false);
    if (!res.error) {
      router.push("/");
    } else {
      setFormError(res.error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading}
        formError={formError}
      />
    </div>
  );
};

export default Login;
