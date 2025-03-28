import { motion } from "framer-motion";
import L from "leaflet";
import React from "react";
import { useParams } from "react-router-dom";
import DailyLog from "../components/DailyLog";
import RouteMap from "../components/RouteMap";
import useGetTripsById from "../hooks/useGetTripsById";
import MainLayout from "../layouts/MainLayout";
import { formatLogs } from "../utils/utility";

const TripDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetTripsById(Number(id));
  const formattedLogs = formatLogs(data?.logs || []);
  const filteredLogs: L.LatLng[] =
    data?.logs
      ?.filter(
        (log) =>
          log.remarks !== "Pickup location - Loading cargo" &&
          log.remarks !== "Drop-off location - Unloading cargo" &&
          log.remarks !== "Finished" &&
          log.stop_location !== null
      )
      .map((log) => L.latLng(log.stop_location!.lat, log.stop_location!.lng)) ||
    [];
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <h1 className="font-bold text-3xl mb-6 text-gray-800">Trip Details</h1>

        <div className="mt-6">
          <h2 className="font-semibold text-xl text-gray-700 mb-3">
            Route Overview
          </h2>
          <RouteMap
            currentLocation={data?.current_location as L.LatLng}
            pickupLocation={data?.pickup_location as L.LatLng}
            dropoffLocation={data?.dropoff_location as L.LatLng}
            stopsLocation={filteredLogs}
          />
        </div>
        <div className="mt-6">
          {data && <DailyLog logData={formattedLogs} trip={data} />}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default TripDetailPage;
