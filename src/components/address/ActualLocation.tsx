"use client";
import { Locate, LocateFixed } from "lucide-react";
import { useState } from "react";

export default function ActualLocation({
  onSelect,
}: {
  onSelect: (address: string, lat: number, lng: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const getCurrentLocation = () => {
    setIsLoading(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            );

            const data = await response.json();

            if (data.results[0]) {
              const address = data.results[0].formatted_address;
              onSelect(address, latitude, longitude);
            }
          } catch (error) {
            console.error("Error obteniendo la dirección:", error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          setIsLoading(false);
        }
      );
    } else {
      alert("La geolocalización no está disponible en tu navegador");
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <button
        onClick={getCurrentLocation}
        disabled={isLoading}
        className="absolute top-2.5 right-4"
      >
        {isLoading ? (
          <span>Obteniendo ubicación...</span>
        ) : (
          <Locate className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
