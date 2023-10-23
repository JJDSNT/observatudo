import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

export default async function ProtectedRoute() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

console.log(session.user);
/*
  if (session?.user.role === "admin") {
    return <p>You are an admin, welcome!</p>
  }
*/
  

  return (
    <div>
      This is a protected route.
      <br />
      You will only see this if you are authenticated.
      <br />
      Olhar a estrutura de layout para essa página compartilhar o layout das outras paginas como o navbar
      <br />
      https://authjs.dev/reference/adapter/typeorm

      advanced auth com middleware - https://youtu.be/SFQwto0rvps?si=BY3fXrO7HvyHe1-h
      https://next-auth.js.org/tutorials/securing-pages-and-api-routes

      https://authjs.dev/guides/basics/role-based-access-control
      https://www.youtube.com/watch?v=urZ0iMugiiI

      mongo db com next - https://www.youtube.com/watch?v=mOvW3iheF14

      api routes (api query params) - https://youtu.be/WlVV_LA4FCg?si=G2h0-KYb8mywW1wi
      server actions - https://www.youtube.com/watch?v=3nNZXWaSrsc



    </div>
  );
}