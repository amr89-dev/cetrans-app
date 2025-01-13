import { Header } from "../components/Header";
import ActiveTravel from "@/components/ActiveTravel";
import AvailableTravels from "@/components/AvailableTravels";
import MainButtons from "@/components/MainButtons";
import Balance from "@/components/Balance";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col w-full">
        <main className="flex-grow flex flex-col items-center justify-start pb-20 px-4 gap-6">
          <Header />
          {/* 👀 Viaje en curso esto solo debe salir cuando haya un viaje en curso */}
          <ActiveTravel />
          <MainButtons />
          <AvailableTravels />
          <Balance />
        </main>
      </div>
    </>
  );
}
