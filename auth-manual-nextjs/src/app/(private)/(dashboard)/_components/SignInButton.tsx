'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SignInButton() {
  const router = useRouter();

  function handleRedirectToLogin() {
    router.replace('/login');
  }

  return (
    <Button onClick={handleRedirectToLogin}>Entrar</Button>
  )
}
