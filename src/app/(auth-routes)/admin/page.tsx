import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

export default async function ProtectedRoute() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

console.log(session.user);

  if (session?.user.role === "admin") {
    return (
    <div>
      ksdklj
      sdlskdjslk
      akdsjlksaj
      abcde
      <p>You are an admin, welcome! <pre>{JSON.stringify(session)}</pre></p>

    </div>
    )
  }

  

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>

    </div>
  );
}