'use client';

import { Button } from "@/components/ui/button";
import { SignInModal } from "./SignInModal";
import { useState } from "react";

export function SignInButton() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenLoginModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button onClick={handleOpenLoginModal}>Entrar</Button>
      <SignInModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
