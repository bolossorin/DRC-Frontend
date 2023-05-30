// libs
import { FC } from "react";
import cn from "classnames";

// components
import { H5 } from "@/components/common";

// assets
import styles from "./Overall.module.scss";

interface IOverall {
  overall:
    | {
        total: number;
        free: number;
        used: number;
        live: number;
        dead: number;
      }
    | undefined;
}

export const Overall: FC<IOverall> = ({ overall }) => {
  return (
    <div className="border text-center border-[#414040] rounded-lg mb-6">
      <div className="p-3 border-b border-[#414040]">
        <H5 classname="!mb-0 !font-medium">Overall</H5>
      </div>
      <ul className={cn("px-2 md:px-12 py-4 flex items-center justify-between", styles.overall)}>
        <li>
          <span>{overall?.total ?? 0}</span>Total
        </li>
        <li>
          <span>{overall?.free ?? 0}</span>Free
        </li>
        <li>
          <span>{overall?.used ?? 0}</span>Used
        </li>
        <li>
          <span>{overall?.live ?? 0}</span>Live
        </li>
        <li>
          <span>{overall?.dead ?? 0}</span>Dead
        </li>
      </ul>
    </div>
  );
};
