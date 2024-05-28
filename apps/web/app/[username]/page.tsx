import { authOptions } from "@repo/auth";
import { getServerSession } from "@repo/auth/server";

interface IDashboardPageProps {
  params: {
    username: string;
  };
}
export default async function Dashboard({ params }: IDashboardPageProps) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div>This is your dashboard {params.username}</div>
      <div>{JSON.stringify(session, null, 2)}</div>
    </>
  );
}
