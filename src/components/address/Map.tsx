import { GoogleMap, Marker } from "@react-google-maps/api";

export default function Map({
  center,
}: {
  center: { lat: number; lng: number };
}) {
  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="w-full h-[400px] mt-4"
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
