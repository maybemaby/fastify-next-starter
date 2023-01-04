import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Button, Flex } from "ui";

export default function Web() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      <h1>Web</h1>
      <Button />
      {session && <p>{session.user.id}</p>}
      <Flex gap={20}>
        <Link href={"/auth/signup"}>Signup</Link>
        <Link href={"/auth/login"}>Login</Link>
        {session && (
          <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        )}
      </Flex>
    </div>
  );
}
