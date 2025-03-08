import axios from "axios";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
} from "react-leaflet";

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
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [stops, setStops] = useState<L.LatLng[]>([]);
  const [stopTime, setStopTime] = useState<number | null>(null);
  const GRAPH_HOPPER_API_KEY = "40df3919-cb8f-4849-8828-7cadb3b3d05a";

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
      const path = response.data.paths[0];
      const routeCoords = response.data.paths[0].points.coordinates.map(
        ([lng, lat]: [number, number]) => new L.LatLng(lat, lng)
      );

      setRoute(routeCoords);
      setDistance(path.distance / 1609.34);
      setDuration(path.time / 3600000);

      const totalPoints = path.points.coordinates.length;
      const numStops = Math.floor(path.distance / 240000);
      const findClosestIndex = (target: L.LatLng) =>
        path.points.coordinates.findIndex(
          ([lng, lat]: [number, number]) =>
            Math.abs(lat - target.lat) < 0.0005 &&
            Math.abs(lng - target.lng) < 0.0005
        );

      let pickupIndex = findClosestIndex(pickup);
      let dropoffIndex = findClosestIndex(dropoff);

      if (pickupIndex === -1) pickupIndex = Math.floor(totalPoints / 3);
      if (dropoffIndex === -1) dropoffIndex = totalPoints - 1;

      let stopPoints = [path.points.coordinates[pickupIndex]];

      if (numStops > 0) {
        const spacedStops = path.points.coordinates.filter(
          (_: [number, number], index: number) =>
            index > pickupIndex &&
            index < dropoffIndex &&
            (index - pickupIndex) %
              Math.floor((dropoffIndex - pickupIndex) / (numStops + 1)) ===
              0
        );

        stopPoints = [...stopPoints, ...spacedStops];
      }
      stopPoints.push(path.points.coordinates[dropoffIndex]);
      setStopTime(stopPoints.length * 0.5 + 1);
      setStops(
        stopPoints.map(
          (point: [number, number]) => new L.LatLng(point[1], point[0])
        )
      );
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  return (
    <div className="w-full h-[500px] mt-4 relative">
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

        {stops.map((stop, index) => (
          <Marker key={index} position={stop} icon={customIcons.stop}>
            <Tooltip permanent>{`Rest Stop ${index + 1}`}</Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {distance !== null && duration !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-bold">Trip Summary</h3>
          <p>
            <strong>Distance:</strong> {distance.toFixed(2)} miles
          </p>
          <p>
            <strong>Duration:</strong> {duration.toFixed(2)} Hours
          </p>
          <p>
            <strong>Rest Stops:</strong> {stops.length}
          </p>
          <p>
            <strong>Rest Time:</strong> {stopTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default RouteMap;
