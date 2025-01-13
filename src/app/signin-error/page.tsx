"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages = {
    CredentialsSignin: "Usuario o contraseña incorrectos",
    Default: "Ocurrió un error durante el inicio de sesión",
    AccessDenied: "No tienes permiso para acceder",
    EmailSignin: "Error al enviar el email de verificación",
    OAuthSignin: "Error al iniciar sesión con proveedor externo",
    OAuthCallback: "Error en la respuesta del proveedor",
    EmailExists: "Este email ya está registrado",
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[50%] mx-auto">
        <div>
          <h2 className="text-center text-3xl font-bold text-red-600">
            Error de Autenticación
          </h2>

          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <p className="text-center text-red-700">
              {errorMessages[error as keyof typeof errorMessages] ||
                errorMessages.Default}
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver al login
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Necesitas ayuda?{" "}
            <Link
              href="mailto:virtual@musicalcedar.com"
              className="text-blue-600 hover:text-blue-500"
            >
              Contacta soporte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInError() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
