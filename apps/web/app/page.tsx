import { authOptions } from "@repo/auth";
import { getServerSession } from "@repo/auth/server";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/onboard");
  }
  return <div>Home page</div>;
}
