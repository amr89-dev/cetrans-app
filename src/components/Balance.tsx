import {
  Car,
  ChartColumnBig,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Balance() {
  return (
    <Card className="w-full max-w-md mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <ChartColumnBig className="mr-2 h-5 w-5" />
          Resumen de Actividad
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Car className="mr-2 h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Viajes Realizados</p>
              <p className="text-xl font-bold">15</p>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Ganancias</p>
              <p className="text-xl font-bold text-green-600">$1000</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Gastos Totales</p>
              <p className="text-xl font-bold text-red-600">$500</p>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p className="text-xl font-bold text-blue-600">${1000 - 56000}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
