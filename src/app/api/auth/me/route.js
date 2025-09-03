import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  const token = cookies().get("token")?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // if token already contains name, return it
    if (payload && payload.name) {
      return NextResponse.json({
        authenticated: true,
        user: { id: payload.id, name: payload.name, email: payload.email },
      });
    }

    // fallback: if name not in token, fetch from DB by id
    await connectDB();
    const user = await User.findById(payload.id).lean();
    if (!user) return NextResponse.json({ authenticated: false }, { status: 401 });

    return NextResponse.json({
      authenticated: true,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
