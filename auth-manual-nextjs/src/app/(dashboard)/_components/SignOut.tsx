'use client';

import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export function SignOut() {

  const router = useRouter();

  const fetchSignUp = useCallback(async () => {
    await axios.post('/api/auth/sign-out');
    router.replace('/login');
  }, [router]);

  useEffect(() => {
    fetchSignUp()
  }, [fetchSignUp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Spinner size="large" />
    </div>
  );
}
