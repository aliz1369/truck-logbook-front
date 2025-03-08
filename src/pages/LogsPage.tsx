import { motion } from "framer-motion";
import React from "react";
import MainLayout from "../layouts/MainLayout";

const LogsPage: React.FC = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Route Map</h3>
          <motion.div
            className="h-64 bg-gray-200 flex items-center justify-center rounded-md"
            whileHover={{ scale: 1.02 }}
          >
            [Map Placeholder]
          </motion.div>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4">ELD Log Sheet</h3>
          <motion.div
            className="h-64 bg-gray-200 flex items-center justify-center rounded-md"
            whileHover={{ scale: 1.02 }}
          >
            [ELD Log Placeholder]
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default LogsPage;
