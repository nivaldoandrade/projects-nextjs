import { verifyJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await verifyJWT();

  if(!userId) {
    return NextResponse.json(
      { error: 'Unauthorized'},
      {status: 401}
    );
  }

  return NextResponse.json({
    userId,
    orders: [1,2,3,4,5]
  });
}
