import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { DailyLogProps, DutyStatus } from "../types/globalTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const statusMapping: Record<DutyStatus, number> = {
  onDuty: 0,
  driving: 1,
  sleeper: 2,
  offDuty: 3,
};

const DailyLog: React.FC<DailyLogProps> = ({ logData, trip }) => {
  const logsByDay: Record<string, typeof logData> = logData.reduce(
    (acc, log) => {
      const day = moment(log.date).format("YYYY-MM-DD");
      if (!acc[day]) acc[day] = [];
      acc[day].push(log);
      return acc;
    },
    {} as Record<string, typeof logData>
  );
  const days = Object.keys(logsByDay).sort();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = days[selectedDayIndex];
  const selectedDayLogs = logsByDay[selectedDay] || [];

  const labels = Array.from({ length: 96 }, (_, i) =>
    moment(selectedDay)
      .startOf("day")
      .add(i * 15, "minutes")
      .format("HH:mm")
  );

  const logPoints = selectedDayLogs.flatMap((entry, index) => {
    const startTime = moment(entry.start_time, "HH:mm:ss.SSSSSS").format(
      "HH:mm"
    );
    const endTime = moment(entry.end_time, "HH:mm:ss.SSSSSS").format("HH:mm");
    const nextEntry = selectedDayLogs[index + 1];

    if (!labels.includes(startTime) || !labels.includes(endTime)) return [];

    const points = [
      { x: startTime, y: statusMapping[entry.status] },
      { x: endTime, y: statusMapping[entry.status] },
    ];

    if (nextEntry) {
      const nextStartTime = moment(
        nextEntry.start_time,
        "HH:mm:ss.SSSSSS"
      ).format("HH:mm");

      if (labels.includes(nextStartTime)) {
        points.push({
          x: nextStartTime,
          y: statusMapping[nextEntry.status],
        });
      }
    }

    return points;
  });

  const data = {
    labels,
    datasets: [
      {
        label: `Duty Status - ${selectedDay}`,
        data: logPoints,
        borderColor: "black",
        backgroundColor: "black",
        borderWidth: 2,
        stepped: true,
      },
      {
        label: "Status Change Points",
        data: logPoints.filter((_, i) => i % 2 === 0),
        pointBackgroundColor: "red",
        pointRadius: 4,
        pointStyle: "circle",
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category" as const,
        title: { display: true, text: "Time (HH:mm)" },
        ticks: { maxTicksLimit: 25 },
      },
      y: {
        title: { display: true, text: "Duty Status" },
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: function (tickValue: string | number) {
            const labels = ["On Duty", "Driving", "Sleeper", "Off Duty"];
            return labels[Number(tickValue) as unknown as number] || "";
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Driver's Daily Log</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-xl mb-3 text-gray-700">
            Driver & Vehicle Info
          </h2>
          <div className="text-gray-800">
            <p>
              <strong>Driver:</strong> {trip?.driver.name} (
              {trip?.driver.license_number})
            </p>
            <p>
              <strong>Vehicle:</strong> {trip?.vehicle.brand}
              {trip?.vehicle.model} ({trip?.vehicle.year})
            </p>
            <p>
              <strong>Car Number:</strong> {trip?.vehicle.car_number}
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="font-semibold text-xl mb-3 text-gray-700">
            Trip Info
          </h2>
          <div className="text-gray-800">
            <p>
              <strong>Start Date:</strong> {trip?.date}
            </p>
            <p>
              <strong>End Date:</strong> {trip?.end_date}
            </p>
            <p>
              <strong>Distance:</strong> {trip?.distance_miles.toFixed(2)} miles
            </p>
            <p>
              <strong>Estimated Duration:</strong>
              {trip?.estimated_duration_hours.toFixed(2)} hours
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4 mt-5">
        <button
          onClick={() => setSelectedDayIndex((prev) => Math.max(0, prev - 1))}
          disabled={selectedDayIndex === 0}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            selectedDayIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous Day
        </button>
        <span className="text-lg font-semibold">{selectedDay}</span>
        <button
          onClick={() =>
            setSelectedDayIndex((prev) => Math.min(days.length - 1, prev + 1))
          }
          disabled={selectedDayIndex === days.length - 1}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            selectedDayIndex === days.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next Day
        </button>
      </div>
      <div className="h-64 mt-5">
        <Line data={data} options={options} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Remarks</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Start Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                End Time
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedDayLogs.map((entry, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="px-4 py-2">{entry.start_time}</td>
                <td className="px-4 py-2">{entry.end_time}</td>
                <td className="px-4 py-2 capitalize">{entry.status}</td>
                <td className="px-4 py-2">{entry.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyLog;
