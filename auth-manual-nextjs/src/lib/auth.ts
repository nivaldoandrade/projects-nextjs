import { env } from "@/config/env";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { prismaClient } from "./prisma";

async function getAccessToken() {
   const cookiesStore = await cookies();

    const accessToken = cookiesStore.get('accessToken')?.value;
    return accessToken;
}

async function verifyJWT() {
  const accessToken =  await getAccessToken();

  if(!accessToken) {
    return null;
  }

  try {
    const {sub} = verify(accessToken, env.jwtSecret) as JwtPayload;

    if(!sub) {
      return null;
    }

    return sub;
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const jwt = await verifyJWT();

  return !!jwt;
}

export async function auth() {
  const userId = await verifyJWT();

  if(!userId) {
    return null;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 300));

    const user = await prismaClient.user.findUnique(
      {where: {
        id: userId
      }}
    );

    if(!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
