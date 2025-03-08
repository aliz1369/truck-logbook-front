import { motion } from "framer-motion";
import L from "leaflet";
import React, { useState } from "react";
import DailyLog from "../components/DailyLog";
import MapModal from "../components/MapModal";
import RouteMap from "../components/RouteMap";
import MainLayout from "../layouts/MainLayout";
import { LogEntry } from "../types/globalTypes";

const TripFormPage: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<L.LatLng | null>(null);
  const [cycleHours, setCycleHours] = useState<number>(0);
  const [pickupLocation, setPickupLocation] = useState<L.LatLng | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<L.LatLng | null>(null);
  const [isSelecting, setIsSelecting] = useState<
    "current" | "pickup" | "dropoff" | null
  >(null);

  const [logData, setLogData] = useState<LogEntry[]>([
    {
      start: "00:00",
      end: "06:00",
      status: "offDuty",
      remarks: "End of previous day",
    },
    {
      start: "06:00",
      end: "07:30",
      status: "driving",
      remarks: "Started trip from Green Bay, WI",
    },
    {
      start: "07:30",
      end: "08:15",
      status: "onDuty",
      remarks: "Pre-trip inspection",
    },
    { start: "08:15", end: "08:30", status: "driving" },
    {
      start: "08:30",
      end: "10:00",
      status: "sleeper",
      remarks: "30 min break at rest area",
    },
    { start: "10:00", end: "14:00", status: "driving" },
    {
      start: "14:00",
      end: "14:30",
      status: "onDuty",
      remarks: "Post-trip inspection",
    },
    {
      start: "14:30",
      end: "23:45",
      status: "offDuty",
      remarks: "End of shift, parked at terminal",
    },
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currentLocation ||
      !cycleHours ||
      !pickupLocation ||
      !dropoffLocation
    ) {
      alert("Please fill in all fields!");
      return;
    }

    console.log("Trip Details Submitted:", {
      currentLocation,
      cycleHours,
      pickupLocation: pickupLocation?.lat + ", " + pickupLocation?.lng,
      dropoffLocation: dropoffLocation?.lat + ", " + dropoffLocation?.lng,
    });

    alert("Trip details submitted successfully!");
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Plan Your Trip</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Location:
            </label>
            <button
              type="button"
              className="w-full bg-gray-200 p-3 rounded-md text-left"
              onClick={() => setIsSelecting("current")}
            >
              {currentLocation
                ? `Current: ${currentLocation.lat.toFixed(
                    2
                  )}, ${currentLocation.lng.toFixed(2)}`
                : "Select Current Location"}
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Pickup Location:
            </label>
            <button
              type="button"
              className="w-full bg-gray-200 p-3 rounded-md text-left"
              onClick={() => setIsSelecting("pickup")}
            >
              {pickupLocation
                ? `Pickup: ${pickupLocation.lat.toFixed(
                    2
                  )}, ${pickupLocation.lng.toFixed(2)}`
                : "Select Pickup Location"}
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Dropoff Location:
            </label>
            <button
              type="button"
              className="w-full bg-gray-200 p-3 rounded-md text-left"
              onClick={() => setIsSelecting("dropoff")}
            >
              {dropoffLocation
                ? `Dropoff: ${dropoffLocation.lat.toFixed(
                    2
                  )}, ${dropoffLocation.lng.toFixed(2)}`
                : "Select Dropoff Location"}
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Cycle Used (Hours):
            </label>
            <input
              type="number"
              value={cycleHours}
              onChange={(e) => setCycleHours(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hours used"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 w-full bg-blue-600 text-white px-5 py-3 rounded-md shadow-md hover:bg-blue-500 transition"
            type="submit"
          >
            Submit Trip Details
          </motion.button>
        </form>
        <div className="mt-5 z-1">
          <RouteMap
            currentLocation={currentLocation}
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
          />
        </div>
        <DailyLog logData={logData} />
      </motion.div>

      {isSelecting && (
        <MapModal
          setLocation={
            isSelecting === "pickup"
              ? setPickupLocation
              : isSelecting === "dropoff"
              ? setDropoffLocation
              : setCurrentLocation
          }
          onClose={() => setIsSelecting(null)}
        />
      )}
    </MainLayout>
  );
};

export default TripFormPage;
