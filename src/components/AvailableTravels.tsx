import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function AvailableTravels() {
  const viajesDisponibles = [
    {
      id: 1,
      origen: "Centro",
      destino: "Aeropuerto",
      fecha: "2023-06-15",
      hora: "14:00",
    },
    {
      id: 2,
      origen: "Plaza Mayor",
      destino: "Estadio",
      fecha: "2023-06-16",
      hora: "10:30",
    },
  ];
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Viajes Disponibles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {viajesDisponibles.length > 0 ? (
          <ul className="space-y-4">
            {viajesDisponibles.map((viaje) => (
              <li
                key={viaje.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">
                    {viaje.origen} - {viaje.destino}
                  </p>
                  <p className="text-sm text-gray-500">
                    {viaje.fecha} a las {viaje.hora}
                  </p>
                </div>
                <Button size="sm">Tomar</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No hay viajes disponibles en este momento
          </p>
        )}
      </CardContent>
    </Card>
  );
}
