export type DutyStatus = "offDuty" | "sleeper" | "driving" | "onDuty";

export interface LogEntry {
  start_time: string;
  end_time: string;
  status: DutyStatus;
  remarks?: string;
  date: Date;
  day: number;
  stop_location: { lat: number; lng: number } | null;
}

export interface DailyLogProps {
  logData: LogEntry[];
  trip: Trip;
}

export interface TripDetails {
  currentLocation: string;
  pickupLocation: string;
  dropoffLocation: string;
  milesDriven: number;
  cycleHoursUsed: number;
  remainingHours: number;
}

export interface MapComponentProps {
  currentLocation: L.LatLng | null;
  pickupLocation: L.LatLng | null;
  dropoffLocation: L.LatLng | null;
  setTempLocation: (location: L.LatLng) => void;
}

export interface PDFExportProps {
  logData: LogEntry[];
  tripDetails: TripDetails;
}

export interface PostTrip {
  driver_id: number;
  vehicle_id: number;
  current_location: { lat: number; lng: number };
  pickup_location: { lat: number; lng: number };
  dropoff_location: { lat: number; lng: number };
}

export interface DriverType {
  id?: number;
  name: string;
  license_number: string;
}

export interface Vehicle {
  id?: number;
  car_number: string;
  brand: string;
  model: string;
  year: number;
}

export interface RemainingHour {
  available_hours: number;
  driver_name: string;
}

export interface Trip {
  id: number;
  driver: DriverType;
  vehicle: Vehicle;
  date: string;
  end_date: string;
  distance_miles: number;
  estimated_duration_hours: number;
  current_location: { lat: number; lng: number };
  pickup_location: { lat: number; lng: number };
  dropoff_location: { lat: number; lng: number };
  logs: LogEntry[];
}
