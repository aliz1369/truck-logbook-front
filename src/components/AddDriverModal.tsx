import React, { useState } from "react";
import useAddDriver from "../hooks/useAddDriver";
import { DriverType } from "../types/globalTypes";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface AddDriverModalProps {
  onClose: () => void;
}

const AddDriverModal: React.FC<AddDriverModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<DriverType>({
    name: "",
    license_number: "",
  });

  const { mutate, isPending } = useAddDriver();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        toast.success("New driver added.")
        onClose();
      },
      onError: () => {
        toast.error("Error adding driver. Please try again.");
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
        <h2 className="text-xl font-bold mb-4">Add New Driver</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Driver Name:</label>
            <input
              type="text"
              id="name"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">License Number:</label>
            <input
              type="text"
              id="license_number"
              className="w-full border p-2 rounded"
              value={formData.license_number}
              onChange={handleChange}
              required
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
              {isPending ? "Adding..." : "Add Driver"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddDriverModal;
