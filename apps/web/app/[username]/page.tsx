import { authOptions } from "@repo/auth";
import { getServerSession } from "@repo/auth/server";
import { redirect } from "next/navigation";

interface IDashboardPageProps {
  params: {
    username: string;
  };
}
export default async function Dashboard({ params }: IDashboardPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  const userId = session.user.id;
  const res = await fetch(
    `http://localhost:3000/api/collections/?userId=${userId}`,
    { method: "GET" },
  );
  const collections = await res.json();
  return (
    <>
      <div>This is your dashboard {params.username}</div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(collections.collections, null, 2)}</pre>
    </>
  );
}
