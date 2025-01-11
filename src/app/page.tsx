import { auth } from "@/auth";
import SignIn from "./components/Signin";
import { Header } from "./components/Header";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col w-full">
        <main className="flex-grow flex flex-col items-center justify-start   pb-20">
          <Header />
          {/* Viaje en curso */}
          {/* {viajeEnCurso && (
            <Card className="w-full max-w-md mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Car className="mr-2 h-5 w-5" />
                  Viaje en Curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{viajeEnCurso.destino}</p>
                    <p className="text-sm text-gray-500">
                      Desde: {viajeEnCurso.origen}
                    </p>
                  </div>
                  <Button onClick={finalizarViaje} variant="destructive">
                    Finalizar Viaje
                  </Button>
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Botones principales */}
          {/*  <div className="w-full max-w-md space-y-4 mb-6">
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
          </div> */}

          {/* Viajes disponibles */}
          {/*  <Card className="w-full max-w-md">
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
        </Card> */}
          {/* Resumen de actividad */}
          {/* <Card className="w-full max-w-md mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Resumen de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Car className="mr-2 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Viajes Realizados</p>
                    <p className="text-xl font-bold">
                      {usuario.viajesRealizados}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ganancias</p>
                    <p className="text-xl font-bold text-green-600">
                      ${usuario.ganancias}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Gastos Totales</p>
                    <p className="text-xl font-bold text-red-600">
                      ${usuario.gastosTotales}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="text-xl font-bold text-blue-600">
                      ${usuario.ganancias - usuario.gastosTotales}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </main>
      </div>
    </>
  );
}
