import { auth } from "@/lib/auth";
import { AuthProvider } from "@/contexts/AuthContext";


export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  return (
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
  )
}
