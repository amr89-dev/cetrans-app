import { auth } from "@/auth";
import { Notifications } from "./Notifications";

export async function Header() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="bg-transparent w-full">
      <div className="w-full  flex justify-between items-center px-2 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Bienvenido, {user?.name || "usuario"}
        </h1>
        <Notifications />
      </div>
    </header>
  );
}
