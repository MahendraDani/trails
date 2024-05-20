// TODO : Make this as a client component, so that nav background can be changed on scroll
import { LoginForm } from "../forms/login.form";
import getServerSession from "@repo/auth/server";
import { authOptions } from "@repo/auth";
import { Logout } from "../forms/logout.form";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full flex justify-center p-3">
      <div className="w-[75%] flex justify-between items-center">
        <a href="/">
          <h1 className="text-2xl font-bold">Trails</h1>
        </a>
      </div>
      {session?.user ? <Logout /> : <LoginForm />}
    </nav>
  );
};
