import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogsPage from "../pages/LogsPage";
import TripFormPage from "../pages/TripFormPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-trip" element={<TripFormPage />} />
        <Route path="/results" element={<LogsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
