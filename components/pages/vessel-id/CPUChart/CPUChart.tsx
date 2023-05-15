// libs
import { useQuery } from "@apollo/client";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

// assets
import { getGpuLogHistory } from "@/graphql/gpu/getGpuLogHistory";
import { IGpuLogHistory, IntervalValue } from "@/graphql/types/gpuLogHistory";
import { useEffect } from "react";
import { onGpuLogHistoryChange } from "@/graphql/gpu/onGpuLogHistoryChange";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip);

const getOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        offset: true,
        border: {
          color: "#A4A4A4",
        },
        ticks: {
          color: "#F7F7F7",
          font: {
            size: 11,
          },
          padding: 5,
        },
        grid: {
          drawOnChartArea: false,
          color: "#A4A4A4",
        },
      },

      y: {
        min: 0,
        max: 100,
        offset: true,
        border: {
          color: "#A4A4A4",
        },
        grid: {
          drawOnChartArea: false,
          color: "#A4A4A4",
        },
        ticks: {
          color: "#F7F7F7",
          font: {
            size: 11,
          },
          padding: 5,
          stepSize: 20,
          count: 5,
          callback: (value: number | string) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "CPU Usage",
        color: "#F6F6F6",
        font: {
          size: 16,
          weight: "700",
        },
        padding: {
          bottom: 35,
        },
      },
    },
  };
};

const getTimeLabel = (timestamp: string | number, interval: IntervalValue) => {
  const date = new Date(timestamp);

  if (interval === "seven_day") {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
};

interface IChart {
  interval: IntervalValue;
}

const timestamp = new Array(20).fill(0).map((_, i) => new Date().getTime() + i * 120000);

const data = new Array(20).fill(0).map(() => Math.random() * 100);

export const CPUChart = ({ interval }: IChart) => {
  const timestamps = timestamp?.map((data) => getTimeLabel(data, interval));

  return (
    <div className="border border-[#686868] rounded p-5 pt-6 h-[292px]">
      <Line
        options={getOptions()}
        data={{
          labels: timestamps ?? [],
          datasets: [
            {
              label: "Util percent",
              data: data,
              backgroundColor: "#88E207",
              borderColor: "#88E207",
            },
          ],
        }}
      />
    </div>
  );
};
