import { NextResponse } from "next/server"

export async function POST() {
  await new Promise(resolver => setTimeout(resolver, 400));

  const response = new NextResponse(null, {status: 204});

  response.cookies.delete('accessToken');

  return response;
}
