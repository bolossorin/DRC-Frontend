// libs
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface IChart {
  gpuId?: string;
}

const options = {
  responsive: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export const Chart = ({ gpuId }: IChart) => {
  return (
    <Line
      options={{
        responsive: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          x: {
            border: {
              color: "#A4A4A4",
            },
            ticks: {
              color: "#F7F7F7",
              font: {
                family: "Inter",
                size: 11,
              },
            },
            grid: {
              drawOnChartArea: false,
              color: "#A4A4A4",
            },
          },

          y: {
            border: {
              color: "#A4A4A4",
            },
            grid: {
              drawOnChartArea: false,
              color: "#A4A4A4",
            },
            ticks: {
              color: "#F7F7F7",
            },
          },
        },
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
        },
      }}
      data={{
        labels: ["1/1", "2/1", "3/1", "4/1", "5/1", "6/1", "7/1"],
        datasets: [
          { label: "GPU 0 Usage", data: [40, 40, 10, 80, 100], backgroundColor: "#88E207", borderColor: "#88E207" },
        ],
      }}
    />
  );
};
