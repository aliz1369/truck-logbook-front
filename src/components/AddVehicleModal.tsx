import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import useAddVehicle from "../hooks/useAddVehicle";
import { Vehicle } from "../types/globalTypes";

interface AddVehicleModalProps {
  onClose: () => void;
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<Vehicle>({
    car_number: "",
    brand: "",
    model: "",
    year: 0,
  });

  const { mutate, isPending } = useAddVehicle();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        toast.success("Vehicle added successfully!");
        onClose();
      },
      onError: () => {
        toast.error("Error adding vehicle. Please try again.");
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Car Number:</label>
            <input
              type="text"
              id="car_number"
              className="w-full border p-2 rounded"
              value={formData.car_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Brand:</label>
            <input
              type="text"
              id="brand"
              className="w-full border p-2 rounded"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Model:</label>
            <input
              type="text"
              id="model"
              className="w-full border p-2 rounded"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Year:</label>
            <input
              type="number"
              id="year"
              className="w-full border p-2 rounded"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddVehicleModal;
