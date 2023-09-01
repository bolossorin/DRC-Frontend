import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

interface IIteration {
  iterCurrent: number;
  iterEnd: number;
}

export const Iteration: FC<IIteration> = ({ iterCurrent, iterEnd }) => {
  return (
    <div className="flex items-center">
      <div className="relative w-[36px] h-[36px] mr-2">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px]">
          {((iterCurrent / iterEnd) * 100).toFixed(0)}%
        </span>
        <Doughnut
          data={{
            datasets: [
              {
                data: [iterCurrent, iterEnd],
                backgroundColor: ["#88E207", "#D9D9D9",],
                hoverOffset: 4,
                borderWidth: 0,
                // @ts-ignore
                cutout: "80%",
              },
            ],
          }}
          options={{
            events: [],
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
            },
          }}
        />
      </div>
      {new Intl.NumberFormat("en-US").format(iterCurrent)} / {new Intl.NumberFormat("en-US").format(iterEnd)}
    </div>
  );
};
