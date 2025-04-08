'use client';

import { FormLogin } from "@/components/login/form";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <FormLogin onSubmit={handleSubmit} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
