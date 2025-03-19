import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {hash} from 'bcryptjs';

const schema = z.object({
  firstName: z.string().min(1, 'Informe o seu nome'),
  lastName: z.string().min(1, 'Informe o seu sobrenome'),
  email: z.string().email('Informe um email válido'),
  password: z.string().min(2, 'Informe a senha')
})

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {success, error, data} = schema.safeParse(body);

  if(!success) {
    return NextResponse.json(
      {errors: error.issues},
      {status: 400}
    );
  }

  const {firstName, lastName, email, password} = data;

  const emailAlreadyInUse = await prismaClient.user.findUnique(
    {
      where: {email},
      select: {
        id: true
      }
    },
  );

  if(emailAlreadyInUse) {
        return NextResponse.json(
      {error: 'Email is already in use.'},
      {status: 409}
    );
  }

  const hashPassword = await hash(password, 8);

  await prismaClient.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword
    }
  })

  return new NextResponse(null, {status: 204})
}
