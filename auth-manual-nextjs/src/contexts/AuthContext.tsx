'use client';

import { createContext } from "react";

import { User } from "@/entities/User";

interface AuthContenxtValue {
  user: User | null;
  isSignedIn: boolean;
}

export const AuthContext = createContext({} as AuthContenxtValue);


interface AuthProviderValue {
  children: React.ReactNode;
  user: User | null;
}

export function AuthProvider({ children, user }: AuthProviderValue) {
  const isSignedIn = !!user;

  return (
    <AuthContext value={{ user, isSignedIn }}>
      {children}
    </AuthContext>
  )
};
