// app/api/auth/logout/route.js
import { cookies } from "next/headers";

export async function POST() {
  // Remove the auth cookie (adjust the cookie name if needed)
  cookies().set("token", "", { maxAge: 0, path: "/" });

  return new Response(
    JSON.stringify({ message: "Logged out successfully" }),
    { status: 200 }
  );
}
