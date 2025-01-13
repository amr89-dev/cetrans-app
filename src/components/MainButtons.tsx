import Link from "next/link";
import { Button } from "./ui/button";
import { MapPin, Wallet } from "lucide-react";

export default function MainButtons() {
  return (
    <div className="w-full max-w-md flex flex-col space-y-4">
      <Link href="/registrar-viaje" passHref>
        <Button className="w-full text-lg h-14 bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
          <MapPin className="mr-2 h-5 w-5" /> Registrar Viaje
        </Button>
      </Link>
      <Link href="/reportar-gasto" passHref>
        <Button className="w-full text-lg h-14 bg-green-500 hover:bg-green-600 transition-colors duration-200">
          <Wallet className="mr-2 h-5 w-5" /> Reportar Gasto
        </Button>
      </Link>
    </div>
  );
}
