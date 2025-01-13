import { Car } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ActiveTravel() {
  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Car className="mr-2 h-5 w-5" />
          Viaje en Curso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Destino: Trabajo</p>
            <p className="text-sm text-gray-500">Desde: Casa</p>
          </div>
          <Button variant="destructive">Finalizar Viaje</Button>
        </div>
      </CardContent>
    </Card>
  );
}
