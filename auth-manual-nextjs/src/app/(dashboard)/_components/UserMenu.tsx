'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const router = useRouter();
  const { user } = useAuth();

  async function handleSignout() {
    router.replace('/login');
    await axios.post('/api/auth/sign-out');
  };

  return (
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
  );
}
