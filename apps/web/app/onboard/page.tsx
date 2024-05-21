import { authOptions } from "@repo/auth";
import { getServerSession } from "@repo/auth/server";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@repo/db";
import { OnboardForm } from "../../components/onboard-form";

export default async function Onboarduser() {
  // get email from server session
  // get user from database via email
  // check if they already have username, if not then set username otherwise redirect

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const email = session.user.email as string;
  const user = await getUserByEmail({ email });

  const existingUsername = user?.username;

  if (existingUsername) {
    // TODO : change this to dashboard part later
    redirect("/proctected");
  }

  // /onboard page will be rendered only if the user is a new user and doesn't have a username
  return (
    <div className="w-full h-[49.5rem] bg-gradient-to-br from-blue-100 via-yellow-50 to-green-100 flex justify-center items-center">
      <OnboardForm id={user?.id as string} />
    </div>
  );
}
