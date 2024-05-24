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
  const validUser = await getUserByUsername({ username: params.username });
  if (!validUser) {
    redirect("/");
  }
  return <main>{children}</main>;
}
