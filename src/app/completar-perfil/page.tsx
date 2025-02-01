"use client";

import { useState } from "react";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Smartphone,
  User,
  Calendar,
  CreditCard,
  Users,
  MapPin,
  Briefcase,
  Save,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { departamentos } from "@/lib/utils";
import { completeUserProfile } from "@/lib/api/user";
import { UserRole } from "@/types";

export default function CompletarPerfil() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [localState, setLocalState] = useState({
    numeroDocumento: "",
    telefono: "",
    tipoDocumento: "",
    prefijo: "+57",
    firstName: "",
    lastName: "",

    street: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    country: "CO",

    birthDate: "",
    gender: "",

    emergencyPhone: "",
    emergencyName: "",

    role: "",
  });

  const router = useRouter();

  const userToUpdate = {
    phone: localState.prefijo + localState.telefono,
    nationalId: localState.tipoDocumento + "-" + localState.numeroDocumento,
    firstName: localState.firstName,
    lastName: localState.lastName,
    address: [
      {
        street: localState.street,
        complement: localState.complement,
        neighborhood: localState.neighborhood,
        city: localState.city,
        state: localState.state,
        zipCode: localState.zipCode,
        country: localState.country,
      },
    ],

    birthDate: new Date(localState.birthDate),
    gender: localState.gender,
    emergencyContact: [
      {
        phone: localState.emergencyPhone,
        name: localState.emergencyName,
      },
    ],
    role: localState.role as UserRole,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await completeUserProfile(userToUpdate);

      await signOut({ redirect: false });
      await signIn("google", {
        redirect: false,
      });
      router.push("/perfil");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError("Error al actualizar perfil");
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string } }
  ) => {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 mb-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Completa tu Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Personal */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                Información Personal
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Nombre
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={localState.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese su nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Apellido
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={localState.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese su apellido"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2 ">
                <Label
                  htmlFor="tipoDocumento"
                  className="flex items-center w-full"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Documento de Identidad
                </Label>
                <div className=" flex flex-row gap-1  items-center ">
                  <Select
                    name="tipoDocumento"
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "tipoDocumento", value },
                      })
                    }
                    required
                  >
                    <SelectTrigger className="w-1/5">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">
                        CC - Cédula de Ciudadanía
                      </SelectItem>
                      <SelectItem value="CE">
                        CE - Cédula de Extranjería
                      </SelectItem>
                      <SelectItem value="PA">PA - Pasaporte</SelectItem>
                      <SelectItem value="PPT">
                        PPT - Permiso Especial
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    id="numeroDocumento"
                    name="numeroDocumento"
                    value={localState.numeroDocumento}
                    onChange={handleChange}
                    required
                    className="w-4/5"
                    placeholder="Ingrese su número de documento"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Fecha de Nacimiento
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={localState.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Género
                  </Label>
                  <Select
                    name="gender"
                    onValueChange={(value) =>
                      handleChange({ target: { name: "gender", value } })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                      <SelectItem value="O">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Información de Contacto */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                Información de Contacto
              </h3>
              <div className=" flex flex-row items-start ">
                <div className="space-y-2 w-full ">
                  <Label htmlFor="prefijo" className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Celular
                  </Label>
                  <div className="flex flex-row gap-1 items-center">
                    <Input
                      id="prefijo"
                      name="prefijo"
                      value={localState.prefijo}
                      onChange={handleChange}
                      required
                      className="w-1/5"
                      disabled
                    />
                    <Input
                      id="telefono"
                      name="telefono"
                      value={localState.telefono}
                      onChange={handleChange}
                      required
                      className="w-4/5"
                      placeholder="Ingrese numero de celular"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Dirección */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Dirección</h3>
              <div className="space-y-2">
                <Label htmlFor="street" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Dirección
                </Label>
                <Input
                  id="street"
                  name="street"
                  value={localState.street}
                  onChange={handleChange}
                  placeholder="Ej: Calle 123 # 45 - 6"
                  required
                />

                <Input
                  id="complement"
                  name="complement"
                  value={localState.complement}
                  onChange={handleChange}
                  placeholder="Ej: Piso 123"
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Barrio
                  </Label>
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    value={localState.neighborhood}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Ciudad
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={localState.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="state" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Departamento
                  </Label>
                  <Select
                    name="state"
                    onValueChange={(value) =>
                      handleChange({ target: { name: "state", value } })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((departamento) => (
                        <SelectItem
                          value={departamento}
                          defaultValue={"Antioquia"}
                          key={departamento}
                        >
                          {departamento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="zipCode" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Código Postal
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={localState.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div> */}
              </div>
              {/*  <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  País
                </Label>
                <Input
                  id="country"
                  name="country"
                  value={localState.country}
                  onChange={handleChange}
                  required
                />
              </div> */}
            </div>

            <Separator className="my-6" />

            {/* Contacto de Emergencia */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                Contacto de Emergencia
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Nombre
                  </Label>
                  <Input
                    id="emergencyName"
                    name="emergencyName"
                    value={localState.emergencyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone" className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Teléfono
                  </Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={localState.emergencyPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Rol */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                Información Laboral
              </h3>
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Rol
                </Label>
                <Select
                  name="role"
                  onValueChange={(value) =>
                    handleChange({ target: { name: "role", value } })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRIVER">Conductor</SelectItem>
                    <SelectItem value="CLIENT">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? (
                "Guardando"
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" /> Guardar Perfil
                </span>
              )}
            </Button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
