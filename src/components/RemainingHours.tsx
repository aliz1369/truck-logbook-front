import { motion } from "framer-motion";
import React from "react";

interface RemainingHoursProps {
  availableHours: number;
}

const MAX_HOURS = 70;

const RemainingHours: React.FC<RemainingHoursProps> = ({ availableHours }) => {
  const progressPercentage = (availableHours / MAX_HOURS) * 100;

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Remaining Hours</h3>
      <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <motion.div
          className={`h-6 rounded-full ${
            progressPercentage > 90 ? "bg-red-500" : "bg-blue-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <p className="text-center mt-2 font-semibold">
        {availableHours}h left / {MAX_HOURS}h
      </p>
    </div>
  );
};

export default RemainingHours;
