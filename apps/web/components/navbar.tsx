import { Navbar } from "@repo/ui/components/containers/navbar";
import { getServerSession } from "@repo/auth/server";
import { authOptions } from "@repo/auth";
import { LoginForm } from "@repo/ui/components/forms/login-form";
import { Logout } from "./logout-form";
import { redirect } from "next/navigation";

export const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Navbar>
      <div className="w-[75%] flex justify-between items-center">
        <a href="/">
          <h1 className="text-2xl font-bold">Trails</h1>
        </a>
      </div>
      {session?.user ? <Logout /> : <LoginForm />}
    </Navbar>
  );
};
