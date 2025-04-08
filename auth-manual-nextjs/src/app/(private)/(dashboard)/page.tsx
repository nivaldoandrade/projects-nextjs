import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const user = await auth();

  return (
    <div>
      {!user && (
        <h1>Dashboard - Anônimo</h1>
      )}

      {user && (
        <h1>Dashboard - {user.firstName} {user.lastName}</h1>
      )}
    </div>
  );
}
