import React from "react";
import { useMapEvents } from "react-leaflet";

const MapClickHandler: React.FC<{
  onClick: (e: L.LeafletMouseEvent) => void;
}> = ({ onClick }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};
export default MapClickHandler;
