import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isAuthenticated = Boolean(await auth());

  if (isAuthenticated) {
    redirect('/');
  }

  return children;
}
