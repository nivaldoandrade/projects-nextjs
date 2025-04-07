import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";


export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  if (!user) {
    redirect('/login')
  }

  return (
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
  )
}
