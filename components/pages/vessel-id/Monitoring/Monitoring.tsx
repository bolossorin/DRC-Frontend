import React, { useState } from "react";

// libs
import cn from "classnames";

// components
import { H4 } from "@/components/common";
import { GraphIcon } from "@/components/common/Icons";

// assets
import { ISession } from "@/graphql/types/session";
import { Chart } from "../Chart/Chart";
import { IntervalValue } from "@/graphql/types/gpuLogHistory";

type Interval = { label: string; value: IntervalValue };

const intervals: Interval[] = [
  { label: "5 min", value: "five_min" },
  { label: "15 min", value: "fifteen_min" },
  { label: "1h", value: "one_hour" },
  { label: "3h", value: "three_hour" },
  { label: "6h", value: "six_hour" },
  { label: "1d", value: "one_day" },
  { label: "7d", value: "seven_day" },
];

interface IMonitoring {
  gpuIds: ISession["gpu_ids"];
}

export const Monitoring = ({ gpuIds }: IMonitoring) => {
  const [interval, setInterval] = useState<Interval>(intervals[0]);

  return (
    <div className="px-2 md:p-6 md:pl-2 md:pt-4 w-full">
      <div className="p-2 md:p-6 bg-[#2F2F2F] rounded">
        <H4 classname="!mb-6 flex items-center gap-4">
          <GraphIcon classname="w-5" />
          Monitoring
        </H4>
        <div className="flex lg:gap-16 md:gap-10 gap-2 items-center mt-6 py-3 md:px-[30px] px-3 border border-[#686868] rounded w-max">
          {intervals.map((i) => (
            <div
              key={i.value}
              onClick={() => setInterval(i)}
              className={cn("cursor-pointer", interval.value === i.value && "text-[#88E207]")}
            >
              {i.label}
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {gpuIds.map((id) => (
            <Chart key={id} gpuId={id} interval={interval.value} />
          ))}
        </div>
      </div>
    </div>
  );
};
