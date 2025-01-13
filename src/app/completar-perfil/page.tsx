"use client";

import { useState } from "react";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Save, IdCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CompletarPerfil() {
  const [localState, setLocalState] = useState({
    numeroDocumento: "",
    telefono: "",
    tipoDocumento: "",
    prefijo: "+57",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: localState.prefijo + localState.telefono,
          nationalId: localState.tipoDocumento + localState.numeroDocumento,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar perfil");
      }

      await signOut({ redirect: false });
      await signIn("google", {
        redirect: false,
      });
      router.push("/perfil");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Completa tu Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <IdCard className="mr-2 h-4 w-4" />
                Documento de Identidad
              </Label>
              <div className="flex space-x-2">
                <div className="w-1/5">
                  <Select
                    onValueChange={(value) =>
                      setLocalState((prev) => ({
                        ...prev,
                        tipoDocumento: value,
                      }))
                    }
                    name="tipoDocumento"
                    value={localState.tipoDocumento}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">CC</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="PPT">PPT</SelectItem>
                      <SelectItem value="PEP">PEP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-4/5">
                  <Input
                    id="numeroDocumento"
                    name="numeroDocumento"
                    placeholder="Número"
                    value={localState.numeroDocumento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center">
                <Smartphone className="mr-2 h-4 w-4" />
                Celular
              </Label>
              <div className="flex space-x-2">
                <div className="w-1/5">
                  <Input value={"+57"} className="text-center" disabled></Input>
                </div>
                <div className="w-4/5">
                  <Input
                    id="numeroDocumento"
                    name="telefono"
                    placeholder="Celular"
                    type="tel"
                    value={localState.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              <Save className="mr-2 h-4 w-4" /> Guardar Perfil
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
