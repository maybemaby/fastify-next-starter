import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Button } from "ui";

export default function Web() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      <h1>Web</h1>
      <Button />
      {session && <p>{session.user.id}</p>}
      <Link href={"/auth/signup"}>Signup</Link>
      <Link href={"/auth/login"}>Login</Link>
      {session && (
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      )}
    </div>
  );
}
