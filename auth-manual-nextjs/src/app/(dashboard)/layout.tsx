import { auth } from "@/lib/auth";
import AppBar from "./_components/Appbar";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex w-full min-h-svh flex-col">
      <AppBar />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
