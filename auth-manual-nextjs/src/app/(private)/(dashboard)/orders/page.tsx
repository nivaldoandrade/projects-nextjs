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
    <h1>Orders</h1>
  );
}
