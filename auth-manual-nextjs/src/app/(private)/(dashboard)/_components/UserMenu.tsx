'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { SignInButton } from "./SignInButton";

export function UserMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  async function handleSignout() {
    try {
      setIsLoading(true);
      await axios.post('/api/auth/sign-out');
      router.refresh();
    } catch {
      toast.error("Falha ao sair. Por favor, tente novamente");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <SignInButton />
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <strong className="block">
              {user.firstName} {user.lastName}
            </strong>
            <small className="text-muted-foreground">{user.email}</small>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleSignout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {
        isLoading && (
          <div className="fixed inset-0 bg-background z-100 grid place-items-center">
            <Spinner size="large" />
          </div>
        )
      }
    </>
  );
}
