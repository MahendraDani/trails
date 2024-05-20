import { authOptions } from "@repo/auth";
import getServerSession from "@repo/auth/server";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <main>{session && <pre>{JSON.stringify(session, null, 2)}</pre>}</main>
  );
}
