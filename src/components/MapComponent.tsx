import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

const customMarker = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapComponentProps {
  setTempLocation: (location: L.LatLng) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ setTempLocation }) => {
  const [tempLoc, setTempLoc] = useState<L.LatLng | null>(null);

  const location = { lat: 38.44, lng: 27.1424 };
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 300);
    }
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setTempLoc(e.latlng);
        setTempLocation(e.latlng);
      },
    });
    return null;
  };
  return (
    <MapContainer
      center={location}
      zoom={12}
      style={{ height: "500px", width: "100%", zIndex: 1 }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />

      {tempLoc && <Marker position={tempLoc} icon={customMarker} />}
    </MapContainer>
  );
};

export default MapComponent;
