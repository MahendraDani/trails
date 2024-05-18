import { authOptions } from "@repo/auth";
import getServerSession from "@repo/auth/server";
import SignOut from "./components/sign-out";
import { SignIn } from "./components/sign-in";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <div>Hello</div>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}

      {session ? <SignOut /> : <SignIn />}
    </main>
  );
}
