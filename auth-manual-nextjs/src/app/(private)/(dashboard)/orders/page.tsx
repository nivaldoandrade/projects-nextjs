'use client';

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";

export default function Orders() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    axios.get('/api/orders');
  }, [isSignedIn])
  return (
    <div>
      {!isSignedIn && (
        <div className="w-full h-12 bg-slate-200 grid place-items-center rounded-lg text-slate-950">
          Faça login para visualizar os seus pedidos!
        </div>
      )}

      {isSignedIn && (
        <h1>Seus pedidos</h1>
      )}
    </div>
  );
}
