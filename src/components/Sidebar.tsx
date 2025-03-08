import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: isOpen ? 0 : -200 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`h-screen bg-blue-700 text-white p-5 fixed ${
        isOpen ? "w-64" : "w-20"
      } transition-all`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none mb-5"
      >
        {isOpen ? "⬅" : "➡"}
      </button>
      <h2 className="text-2xl font-bold mb-5">
        {isOpen ? "Trip Planner" : "TP"}
      </h2>
      <nav className="mt-5">
        <Link to="/" className="block py-2 px-4 hover:bg-blue-600">
          🏠 {isOpen && "Home"}
        </Link>
        <Link to="/plan-trip" className="block py-2 px-4 hover:bg-blue-600">
          🚚 {isOpen && "Plan Trip"}
        </Link>
        <Link to="/results" className="block py-2 px-4 hover:bg-blue-600">
          📜 {isOpen && "Trip Logs"}
        </Link>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
