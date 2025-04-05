import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { User } from "@/entities/User";

interface NextRequestWithUser extends NextRequest {
  user: User;
}

export function withAuth(handler: (request: NextRequestWithUser) => Promise<unknown>) {
  return async (request: NextRequest) => {
    const user = await auth();

    if(!user) {
      return NextResponse.json(
        { error: 'Unauthorized'},
        {status: 401}
      );
    }

    const requestWithUser = request as NextRequestWithUser;

    requestWithUser.user = user;

    return handler(requestWithUser);
  }
}

export function withAuthorization(handler: (request: NextRequestWithUser) => Promise<unknown>) {
  return async (request: NextRequestWithUser) => {
    // Execute authorization validation

    return handler(request);
  }
}
