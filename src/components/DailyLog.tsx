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
  offDuty: 3,
  sleeper: 2,
  driving: 1,
  onDuty: 0,
};

const DailyLog: React.FC<DailyLogProps> = ({ logData }) => {
  const labels = Array.from({ length: 96 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  });

  const logPoints: { x: string; y: number }[] = logData.flatMap(
    (entry, index) => {
      const startIndex = labels.indexOf(entry.start);
      const endIndex = labels.indexOf(entry.end);
      const nextEntry = logData[index + 1];

      if (startIndex === -1 || endIndex === -1) return [];

      const points = [
        { x: labels[startIndex], y: statusMapping[entry.status] },
        { x: labels[endIndex], y: statusMapping[entry.status] },
      ];

      if (nextEntry) {
        const nextStartIndex = labels.indexOf(nextEntry.start);
        if (nextStartIndex !== -1) {
          points.push({
            x: labels[nextStartIndex],
            y: statusMapping[nextEntry.status],
          });
        }
      }

      return points;
    }
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Duty Status",
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
        title: { display: true, text: "Time (24-Hour Format)" },
        ticks: { maxTicksLimit: 96 },
      },
      y: {
        title: { display: true, text: "Duty Status" },
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
      <div className="h-64">
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
            {logData
              .filter((entry) => entry.remarks)
              .map((entry, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="px-4 py-2">{entry.start}</td>
                  <td className="px-4 py-2">{entry.end}</td>
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
