import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold">Welcome to Trip Planner</h2>
        <p className="mt-3 text-lg">
          Plan your truck route with automated logs and stops.
        </p>
        <Link
          to="/plan-trip"
          className="mt-5 inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-500 transition"
        >
          Start Planning
        </Link>
      </motion.div>
    </MainLayout>
  );
};

export default HomePage;
