"use client";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import ActualLocation from "./ActualLocation";

export default function AddressInput({
  onSelect,
  flag,
}: {
  onSelect: (address: string, lat: number, lng: number, name: string) => void;
  flag: string;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <PlacesAutocomplete onSelect={onSelect} flag={flag} />;
}

function PlacesAutocomplete({
  onSelect,
  flag,
}: {
  onSelect: (address: string, lat: number, lng: number, name: string) => void;
  flag: string;
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue("", false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect(address, lat, lng, flag);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="relative">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="w-full p-2 border rounded-md"
          placeholder="Buscar dirección"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      {flag !== "destino" && <ActualLocation onSelect={onSelect} flag={flag} />}
    </div>
  );
}
