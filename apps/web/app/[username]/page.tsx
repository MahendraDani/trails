import { authOptions } from "@repo/auth";
import { getServerSession } from "@repo/auth/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IDashboardPageProps {
  params: {
    username: string;
  };
}
export default async function Dashboard({ params }: IDashboardPageProps) {
  const token = cookies().get("next-auth.session-token")?.value;
  const res = await fetch(`http://localhost:3000/api/collections/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const collections = await res.json();
  return (
    <>
      <div>This is your dashboard {params.username}</div>
      <pre>{JSON.stringify(collections.collections, null, 2)}</pre>
    </>
  );
}
