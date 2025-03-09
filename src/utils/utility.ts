import { DutyStatus, LogEntry } from "../types/globalTypes";

export const formatLogs = (logs: LogEntry[]): LogEntry[] => {
  return logs.map((log) => {
    let startTimeStr = log.start_time;
    let endTimeStr = log.end_time;

    if (!startTimeStr.includes("T")) {
      startTimeStr = `${log.date}T${startTimeStr}`;
      endTimeStr = `${log.date}T${endTimeStr}`;
    }

    const startTime = new Date(startTimeStr);
    const endTime = new Date(endTimeStr);

    if (isNaN(startTime.getTime())) {
      console.error("Invalid startTime:", log.start_time);
    }
    if (isNaN(endTime.getTime())) {
      console.error("Invalid endTime:", log.end_time);
    }

    const roundToQuarterHour = (date: Date): string => {
      if (isNaN(date.getTime())) return "Invalid Time";

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      let roundedMinutes = Math.round((minutes + seconds / 60) / 15) * 15;

      if (roundedMinutes === 60) {
        if (hours === 23) {
          return "23:45";
        }
        date.setHours(hours + 1);
        roundedMinutes = 0;
      }

      date.setMinutes(roundedMinutes, 0, 0);

      return date.toLocaleTimeString("en-US", { hour12: false });
    };

    return {
      start_time: roundToQuarterHour(startTime),
      end_time: roundToQuarterHour(endTime),
      status: log.status as DutyStatus,
      remarks: log.remarks || "",
      date: new Date(log.date),
      day: log.day,
      stop_location: log.stop_location,
    };
  });
};
