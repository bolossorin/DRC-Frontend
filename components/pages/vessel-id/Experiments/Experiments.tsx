import React, { useState } from "react";

// libs
import cn from "classnames";

// components
import { H4 } from "@/components/common";
import { Filters, Search } from "../../vessels";
import { IFilter } from "@/utility/types";
import { TableExperiments } from "../";

// assets
import styles from "./Experiments.module.scss";

export const Experiments = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);

  return (
    <div className="px-2 md:px-6 2xl:pl-2 md:pt-2 2xl:py-4 md:pb-4 pb-2 w-full 2xl:w-[66%]">
      <div className="p-2 md:p-6 bg-[#2F2F2F] rounded">
        <H4 classname="!mb-6 flex items-center">
          <img className="w-5 mr-4" src={"/pytorch-seek.svg"} alt="" />
          Experiments
        </H4>
        <div className="flex items-start">
          <div className={cn("max-w-[224px]", styles.search)}>
            <Search placeholder="Search" setFilters={setFilters} filters={filters} />
          </div>
          <div className="px-6">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
        <TableExperiments />
      </div>
    </div>
  );
};
