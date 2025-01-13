import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button className="w-full bg-red-500 hover:bg-red-600" type="submit">
        <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
      </Button>
    </form>
  );
}
