import { DriverType, PostTrip, Vehicle } from "../types/globalTypes";
import apiClient from "./apiClient";

export const addDriver = async (driver: DriverType) => {
  const response = await apiClient.post("/drivers/", driver);
  return response.data;
};

export const getDrivers = async () => {
  const response = await apiClient.get(`/drivers/`);
  return response.data;
};

export const getDriverRemainHour = async (id: number, date?: string | Date) => {
  if (!date) throw new Error("Date is required");

  const referenceDate =
    typeof date === "string" ? date : date.toISOString().split("T")[0];

  const response = await apiClient.get(
    `/drivers/${id}/hours?reference_date=${referenceDate}`
  );
  return response.data;
};

export const addVehicle = async (vehicle: Vehicle) => {
  const response = await apiClient.post("/vehicles/", vehicle);
  return response.data;
};

export const getVehicle = async () => {
  const response = await apiClient.get(`/vehicles/`);
  return response.data;
};

export const addTrip = async (trip: PostTrip) => {
  const response = await apiClient.post(`/trips/`, trip);
  return response.data;
};

export const getTrips = async () => {
  const response = await apiClient.get(`/trips/`);
  return response.data;
};

export const getTripsById = async (id: number) => {
  const response = await apiClient.get(`/trips/${id}`);
  return response.data;
};
