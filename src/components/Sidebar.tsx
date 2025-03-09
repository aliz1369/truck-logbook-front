import { motion } from "framer-motion";
import { FaHome, FaListAlt, FaTruckMoving } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Plan Trip", path: "/plan-trip", icon: <FaTruckMoving /> },
    { name: "Trip Lists", path: "/trip-lists", icon: <FaListAlt /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="h-screen bg-blue-700 text-white p-5 fixed w-64 transition-all shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-5">Trip Planner</h2>
      <nav className="mt-5">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 py-2 px-4 rounded-md transition-colors mb-5 ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-blue-600"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
