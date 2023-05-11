// libs
import { useQuery } from "@apollo/client";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// assets
import { getGpuLogHistory } from "@/graphql/gpu/getGpuLogHistory";
import { IGpuLogHistory, IntervalValue } from "@/graphql/types/gpuLogHistory";
import { useEffect } from "react";
import { onGpuLogHistoryChange } from "@/graphql/gpu/onGpuLogHistoryChange";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const getOptions = (title: string) => ({
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
    legeng: {
      position: "top",
    },
    title: {
      display: true,
      text: `GPU ${title} Usage`,
      color: "#F6F6F6",
      font: {
        size: 16,
        weight: "700",
      },
    },
  },
});

const getTimeLabel = (timestamp: string, interval: IntervalValue) => {
  const date = new Date(timestamp);

  if (interval === "one_day" || interval === "seven_day") {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
};

interface IChart {
  gpuId: string;
  interval: IntervalValue;
}

export const Chart = ({ gpuId, interval }: IChart) => {
  const { data, subscribeToMore } = useQuery<{ gpu_log_history: IGpuLogHistory }>(getGpuLogHistory, {
    variables: {
      gpu_id: gpuId,
      interval,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: onGpuLogHistoryChange,
      variables: { gpu_id: gpuId, interval },
      updateQuery: (prev, { subscriptionData }) => {
        return { gpu_log_history: subscriptionData?.data?.gpu_log_history ?? prev };
      },
    });

    return () => unsubscribe();
  }, [gpuId, interval, subscribeToMore]);

  const chartData = data?.gpu_log_history?.timestamp?.map((t, i) => ({
    util_percent: data?.gpu_log_history?.util_percent[i],
    timestamp: getTimeLabel(t, interval),
    memory_util_percent: data?.gpu_log_history?.memory_util_percent[i],
  }));

  // remove duplicate timestamp data
  const timestamps = chartData?.map((data) => data.timestamp);

  const filteredChartData = chartData?.filter(({ timestamp }, index) => !timestamps?.includes(timestamp, index + 1));

  return (
    <div className="border border-[#686868] rounded p-5 pt-6 h-[352px]">
      <Line
        options={getOptions(data?.gpu_log_history?.name ?? "")}
        data={{
          labels: filteredChartData?.map((data) => data.timestamp) ?? [],
          datasets: [
            {
              label: "Util percent",
              data: filteredChartData?.map((data) => data.util_percent) ?? [],
              backgroundColor: "#88E207",
              borderColor: "#88E207",
            },
            {
              label: "Memory util percent",
              data: filteredChartData?.map((data) => data.memory_util_percent) ?? [],
              backgroundColor: "#FFC36A",
              borderColor: "#FFC36A",
            },
          ],
        }}
      />
    </div>
  );
};