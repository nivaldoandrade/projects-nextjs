import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await auth();

  if(!user) {
    return NextResponse.json(
      { error: 'Unauthorized'},
      {status: 401}
    );
  }

  return NextResponse.json({
    userId: user.id,
    orders: [1,2,3,4,5]
  });
}
