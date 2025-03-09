import axios from "axios";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

const customIcons = {
  current: new L.Icon({
    iconUrl: "/TruckIcon.png",
    iconSize: [35, 35],
  }),
  pickup: new L.Icon({
    iconUrl: "/Location.png",
    iconSize: [35, 35],
  }),
  dropoff: new L.Icon({
    iconUrl: "/Box.png",
    iconSize: [35, 35],
  }),
  stop: new L.Icon({
    iconUrl: "/Stop.png",
    iconSize: [35, 35],
  }),
};

interface RouteMapProps {
  currentLocation: L.LatLng | null;
  pickupLocation: L.LatLng | null;
  dropoffLocation: L.LatLng | null;
}

const RouteMap: React.FC<RouteMapProps> = ({
  currentLocation,
  pickupLocation,
  dropoffLocation,
}) => {
  const [route, setRoute] = useState<L.LatLng[]>([]);
  // const GRAPH_HOPPER_API_KEY = "40df3919-cb8f-4849-8828-7cadb3b3d05a";

  useEffect(() => {
    if (currentLocation && pickupLocation && dropoffLocation) {
      fetchRoute(currentLocation, pickupLocation, dropoffLocation);
    }
  }, [currentLocation, pickupLocation, dropoffLocation]);

  const fetchRoute = async (
    current: L.LatLng,
    pickup: L.LatLng,
    dropoff: L.LatLng
  ) => {
    try {
      const url = `https://graphhopper.com/api/1/route?point=${current.lat},${current.lng}&point=${pickup.lat},${pickup.lng}&point=${dropoff.lat},${dropoff.lng}&profile=truck&instructions=true&locale=en&calc_points=true&key=${GRAPH_HOPPER_API_KEY}&points_encoded=false`;
      const response = await axios.get(url);
      const routeCoords = response.data.paths[0].points.coordinates.map(
        ([lng, lat]: [number, number]) => new L.LatLng(lat, lng)
      );
      setRoute(routeCoords);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  return (
    <div className="w-full h-[500px] mt-4 relative z-0">
      <MapContainer
        center={currentLocation || [38.44, 27.1424]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {currentLocation && (
          <Marker position={currentLocation} icon={customIcons.current} />
        )}
        {pickupLocation && (
          <Marker position={pickupLocation} icon={customIcons.pickup} />
        )}
        {dropoffLocation && (
          <Marker position={dropoffLocation} icon={customIcons.dropoff} />
        )}

        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default RouteMap;
