import React, { FC } from "react";

// components
import { H4 } from "@/components/common";

interface Props {
  variant: "gpu" | "cpu";
}

export const Title: FC<Props> = ({ variant }) => {
  return (
    <H4 classname="!mb-6 flex items-center !text-xl">
      <img className="w-7 mr-4" src={variant === "gpu" ? "/gpu.svg" : "/cpu.svg"} alt="" />
      {variant === "gpu" ? "GPU" : "CPU"}
    </H4>
  );
};
