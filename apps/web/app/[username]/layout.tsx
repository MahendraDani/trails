import { authOptions } from "@repo/auth";
import { getServerSession } from "@repo/auth/server";
import { getUserByUsername } from "@repo/db";
import { redirect } from "next/navigation";

interface IDashboardLayoutParams {
  username: string;
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: IDashboardLayoutParams;
}) {
  const user = await getUserByUsername({ username: params.username });

  const session = await getServerSession(authOptions);

  // handle username typos and without auth access
  if ((!session && !user) || !session) {
    redirect("/");
  }

  if (user?.username !== session.user.username) {
    redirect(`/${session?.user.username}`);
  }
  return <main>{children}</main>;
}
