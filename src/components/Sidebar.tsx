import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`h-screen bg-blue-700 text-white p-5 fixed ${"w-64"} transition-all`}
    >
      <h2 className="text-2xl font-bold mb-5">{"Trip Planner"}</h2>
      <nav className="mt-5">
        <Link to="/" className="block py-2 px-4 hover:bg-blue-600">
          🏠 {"Home"}
        </Link>
        <Link to="/plan-trip" className="block py-2 px-4 hover:bg-blue-600">
          🚚 {"Plan Trip"}
        </Link>
        <Link to="/trip-lists" className="block py-2 px-4 hover:bg-blue-600">
          📜 {"Trip Lists"}
        </Link>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
