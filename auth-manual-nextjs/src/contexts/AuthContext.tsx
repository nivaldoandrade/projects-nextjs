'use client';

import { createContext } from "react";

import { User } from "@/entities/User";

interface AuthContenxtValue {
  user: User;
}

export const AuthContext = createContext({} as AuthContenxtValue);


interface AuthProviderValue {
  children: React.ReactNode;
  user: User;
}

export function AuthProvider({ children, user }: AuthProviderValue) {
  return (
    <AuthContext value={{ user }}>
      {children}
    </AuthContext>
  )
};
