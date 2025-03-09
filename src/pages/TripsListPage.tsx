import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import useGetTrips from "../hooks/useGetTrips";
import MainLayout from "../layouts/MainLayout";

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const TripsListPage: React.FC = () => {
  const { data } = useGetTrips();
  const navigate = useNavigate();
  return (
    <MainLayout>
      <h1 className="font-bold text-2xl">Trips</h1>
      <motion.div
        className="overflow-x-auto mt-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.table
          className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4">Trip ID</th>
              <th className="py-2 px-4">Driver</th>
              <th className="py-2 px-4">Vehicle</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Distance (miles)</th>
              <th className="py-2 px-4">Duration (hrs)</th>
              <th className="py-2 px-4">Pickup Location</th>
              <th className="py-2 px-4">Dropoff Location</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((trip) => (
                <motion.tr
                  key={trip.id}
                  className="border-b"
                  variants={tableRowVariants}
                >
                  <td className="py-2 px-4 text-center">{trip.id}</td>
                  <td className="py-2 px-4">
                    {trip.driver.name} <br /> ({trip.driver.license_number})
                  </td>
                  <td className="py-2 px-4">
                    {trip.vehicle.car_number} - {trip.vehicle.brand}{" "}
                    {trip.vehicle.model} ({trip.vehicle.year})
                  </td>
                  <td className="py-2 px-4">{trip.date}</td>
                  <td className="py-2 px-4 text-center">
                    {trip.distance_miles.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {trip.estimated_duration_hours.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {trip.pickup_location.lat.toFixed(2)},{" "}
                    {trip.pickup_location.lng.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {trip.dropoff_location.lat.toFixed(2)},{" "}
                    {trip.dropoff_location.lng.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/trips/${trip.id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      View Details
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </motion.table>
      </motion.div>
    </MainLayout>
  );
};

export default TripsListPage;
