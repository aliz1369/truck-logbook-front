import React from "react";
import { useMapEvents } from "react-leaflet";

const LocationSelector: React.FC<{
  setStart: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
  setEnd: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
}> = ({ setStart, setEnd }) => {
  useMapEvents({
    click(e) {
      setStart((prevStart) => (prevStart === null ? e.latlng : prevStart));
      setEnd((prevEnd) => (prevEnd !== null ? prevEnd : e.latlng));
    },
  });
  useMapEvents({
    click(e) {
      if (!setStart || !setEnd) {
        setStart(e.latlng);
      } else {
        setEnd(e.latlng);
      }
    },
  });
  return null;
};

export default LocationSelector;
