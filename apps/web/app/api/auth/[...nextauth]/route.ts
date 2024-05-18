import { authOptions } from "@repo/auth";
import NextAuth from "@repo/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// why is name not changed!!
