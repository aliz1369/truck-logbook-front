import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TripDetailPage from "../pages/TripDetailPage";
import TripFormPage from "../pages/TripFormPage";
import TripsListPage from "../pages/TripsListPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-trip" element={<TripFormPage />} />
        <Route path="/trip-lists" element={<TripsListPage />} />
        <Route path="/trips/:id" element={<TripDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
