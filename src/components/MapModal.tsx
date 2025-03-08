import L from "leaflet";
import React, { useState } from "react";
import MapComponent from "./MapComponent";

const MapModal: React.FC<{
  setLocation: (location: L.LatLng) => void;
  onClose: () => void;
}> = ({ setLocation, onClose }) => {
  const [tempLocation, setTempLocation] = useState<L.LatLng | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ✖
        </button>
        <MapComponent setTempLocation={setTempLocation} />

        <button
          className="mt-4 w-full bg-blue-600 text-white px-5 py-2 rounded-md"
          onClick={() => {
            if (tempLocation) setLocation(tempLocation);
            onClose();
          }}
          disabled={!tempLocation}
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default MapModal;
