"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Calendar, DollarSign, ArrowLeft, User } from "lucide-react";
import AddressInput from "@/components/address/AddressInput";

export default function RegistrarViaje() {
  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    console.log("Dirección seleccionada:", address);
    console.log("Latitud:", lat);
    console.log("Longitud:", lng);
    // Aquí puedes actualizar tu estado o hacer lo que necesites con los datos
  };

  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [cliente, setCliente] = useState("");
  const [tipoPago, setTipoPago] = useState("contado");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoViaje = {
      origen,
      destino,
      fecha,
      monto: parseFloat(monto),
      cliente,
    };

    // Guardamos el viaje en curso en el localStorage
    localStorage.setItem("viajeEnCurso", JSON.stringify(nuevoViaje));

    if (tipoPago === "pendiente") {
      // Si el pago es pendiente, añadimos a cuentas por cobrar
      const cuentasPorCobrar = JSON.parse(
        localStorage.getItem("cuentasPorCobrar") || "[]"
      );
      cuentasPorCobrar.push({
        id: Date.now(),
        cliente,
        monto: parseFloat(monto),
        fecha,
        viaje: `${origen} - ${destino}`,
      });
      localStorage.setItem(
        "cuentasPorCobrar",
        JSON.stringify(cuentasPorCobrar)
      );
    }

    // Redirigir a la página de viajes
    router.push("/viajes");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-start p-4 pt-8 pb-20">
        <div className="w-full max-w-md flex justify-between items-center mb-6">
          <Link href="/viajes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-blue-600">
            Registrar un Viaje
          </h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>
        <Card className="w-full max-w-md">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="origen" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Origen
                </Label>
                <AddressInput onSelect={handleAddressSelect} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destino" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Destino
                </Label>
                <Input
                  id="destino"
                  placeholder="Ingrese el destino"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Fecha
                </Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monto" className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Monto a cobrar
                </Label>
                <Input
                  id="monto"
                  type="number"
                  placeholder="Ingrese el monto"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Cliente
                </Label>
                <Input
                  id="cliente"
                  placeholder="Nombre del cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Pago</Label>
                <RadioGroup defaultValue="contado" onValueChange={setTipoPago}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contado" id="contado" />
                    <Label htmlFor="contado">Contado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pendiente" id="pendiente" />
                    <Label htmlFor="pendiente">Pendiente</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Registrar Viaje
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
