import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isAuthenticated = Boolean(await auth());

  if (isAuthenticated) {
    redirect('/');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      {children}
    </div>
  );
}
