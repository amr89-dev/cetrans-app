import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Car, Calendar, ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { SignOut } from "@/components/SignOut";

const usuario = {
  nombre: "Juan Pérez",
  email: "juan.perez@ejemplo.com",
  telefono: "+1 234 567 8900",
  fechaRegistro: "01/01/2023",
  viajesRealizados: 150,
  calificacionPromedio: 4.8,
};

export default async function Perfil() {
  const session = await auth();
  const user = session?.user;
  console.log({ user });
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <div className="w-full max-w-md flex justify-between items-center mb-6 ">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-600">Mi Perfil</h1>
        <div className="w-10"></div>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center p-6">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-4">{user?.name}</h2>
          <div className="w-full space-y-2 mb-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-2" />
              <span>{user?.phone}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <span>Miembro desde: {usuario.fechaRegistro}</span>
            </div>
            <div className="flex items-center">
              <Car className="h-5 w-5 text-gray-500 mr-2" />
              <span>Viajes realizados: {usuario.viajesRealizados}</span>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-2" />
              <span>Calificación promedio: {usuario.calificacionPromedio}</span>
            </div>
          </div>

          <SignOut />
        </CardContent>
      </Card>
    </div>
  );
}
