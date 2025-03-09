import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AddDriverModal from "../components/AddDriverModal";
import AddVehicleModal from "../components/AddVehicleModal";
import MapModal from "../components/MapModal";
import RemainingHours from "../components/RemainingHours";
import RouteMap from "../components/RouteMap";
import useAddTrip from "../hooks/useAddTrip";
import useGetDrivers from "../hooks/useGetDrivers";
import useGetRemainHours from "../hooks/useGetRemainHours";
import useGetVehicles from "../hooks/useGetVehicles";
import MainLayout from "../layouts/MainLayout";
import { PostTrip } from "../types/globalTypes";

const TripFormPage: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<L.LatLng | null>(null);
  const [pickupLocation, setPickupLocation] = useState<L.LatLng | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<L.LatLng | null>(null);
  const [isSelecting, setIsSelecting] = useState<
    "current" | "pickup" | "dropoff" | null
  >(null);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [driver_id, setDriver_id] = useState(0);
  const { mutate, isPending } = useAddTrip();
  const { data: drivers } = useGetDrivers();
  const { data: vehicles } = useGetVehicles();
  const [formData, setFormData] = useState({
    driver_id: 0,
    vehicle_id: 0,
  });
  const { data: remainingHours, refetch } = useGetRemainHours(driver_id);

  useEffect(() => {
    if (driver_id) {
      refetch();
    }
  }, [driver_id, refetch]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentLocation || !pickupLocation || !dropoffLocation) {
      setResponseMessage("Please select all required locations.");
      return;
    }

    const requestData: PostTrip = {
      driver_id: formData.driver_id,
      vehicle_id: formData.vehicle_id,
      current_location: {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      },
      pickup_location: {
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
      },
      dropoff_location: {
        lat: dropoffLocation.lat,
        lng: dropoffLocation.lng,
      },
    };
    console.log(requestData);
    mutate(requestData, {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error) => {
        console.error("Form submission error:", error);
      },
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
          <RemainingHours
            availableHours={
              driver_id !== 0 ? remainingHours?.available_hours ?? 0 : 0
            }
          />
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="driver_name"
            >
              Driver Name:
            </label>
            <select
              id="driver_id"
              value={formData.driver_id}
              onChange={(e) => {
                setDriver_id(Number(e.target.value));
                setFormData({ ...formData, driver_id: Number(e.target.value) });
              }}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Driver</option>
              {drivers &&
                drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} ({driver.license_number})
                  </option>
                ))}
            </select>
            <button
              type="button"
              className="mt-2 text-blue-500 underline"
              onClick={() => setIsDriverModalOpen(true)}
            >
              + Add New Driver
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vehicle:
            </label>
            <select
              id="vehicle_id"
              value={formData.vehicle_id}
              onChange={(e) =>
                setFormData({ ...formData, vehicle_id: Number(e.target.value) })
              }
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Vehicle</option>
              {vehicles &&
                vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.car_number} - {vehicle.brand} {vehicle.model}
                  </option>
                ))}
            </select>
            <button
              type="button"
              className="mt-2 text-blue-500 underline"
              onClick={() => setIsVehicleModalOpen(true)}
            >
              + Add New Vehicle
            </button>
          </div>
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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-5 w-full bg-blue-600 text-white px-5 py-3 rounded-md shadow-md hover:bg-blue-500 transition"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Trip Details"}
          </motion.button>
        </form>
        {responseMessage && (
          <div
            className={`mt-4 p-3 rounded text-center ${
              responseMessage.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {responseMessage}
          </div>
        )}
        <div className="mt-5 z-1">
          <RouteMap
            currentLocation={currentLocation}
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
          />
        </div>
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
      {isDriverModalOpen && (
        <AddDriverModal onClose={() => setIsDriverModalOpen(false)} />
      )}
      {isVehicleModalOpen && (
        <AddVehicleModal onClose={() => setIsVehicleModalOpen(false)} />
      )}
    </MainLayout>
  );
};

export default TripFormPage;
