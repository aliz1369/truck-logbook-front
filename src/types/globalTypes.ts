export type DutyStatus = "offDuty" | "sleeper" | "driving" | "onDuty";

export interface LogEntry {
  start: string;
  end: string;
  status: DutyStatus;
  remarks?: string;
}

export interface DailyLogProps {
  logData: LogEntry[];
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
