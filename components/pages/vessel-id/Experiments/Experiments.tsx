import React, { FC, useEffect, useState } from "react";

// libs
import cn from "classnames";
import { useQuery } from "@apollo/client";

// components
import { H4 } from "@/components/common";
import { Filters, Search } from "../../vessels";

// assets
import styles from "./Experiments.module.scss";
import { TableExperiments } from "../";
import { IFilter } from "@/utility/types";
import { IExperiment } from "@/graphql/types/experiment";
import { getExperimentById } from "@/graphql/experiments/getExperimentById";
import { onExperimentChange } from "@/graphql/experiments/onExperimentChange";

interface IExperimentsProps {
  sessionId: string;
}

export const Experiments: FC<IExperimentsProps> = ({ sessionId }) => {
  const { data, subscribeToMore } = useQuery<{
    my_experiments: IExperiment[];
    my_session_experiments?: IExperiment[];
  }>(getExperimentById, {
    variables: {
      session_id: sessionId,
    },
    fetchPolicy: "network-only",
  });

  const [filters, setFilters] = useState<IFilter[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: onExperimentChange,
      variables: { session_id: sessionId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionExperiments = subscriptionData.data?.my_session_experiments ?? [];
        const updatedExperiments: IExperiment[] = prev?.my_experiments?.map((experiment) => {
          const updatedExperiment = subscriptionExperiments.find((s) => s.id === experiment.id);
          if (updatedExperiment) return updatedExperiment;
          return experiment;
        });
        const newExperiments = subscriptionExperiments.filter(
          (experiment) => {
            if(!prev.my_experiments) return null;
            else{!prev.my_experiments.find((prev) => prev.id === experiment.id)}
          }
        );
        return {
          my_experiments: [...newExperiments, ...updatedExperiments],
        };
      },
    });
    return () => unsubscribe();
  }, [sessionId, subscribeToMore]);

  return (
    <div className="px-2 md:px-6 2xl:pl-2 md:pt-2 2xl:py-4 md:pb-4 pb-2 w-full 2xl:w-[66%]">
      <div className="p-2 md:p-6 bg-[#2F2F2F] rounded">
        <H4 classname="!mb-6 flex items-center">
          <img className="w-5 mr-4" src={"/pytorch-seek.svg"} alt="" />
          Experiments
        </H4>
        <div className="flex items-start">
          <div className={cn("max-w-[224px]", styles.search)}>
            {/* <Search placeholder="Search" setFilters={setFilters} filters={filters} /> */}
          </div>
          <div className="px-6">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
        <TableExperiments experiments={data?.my_experiments ?? []} />
      </div>
    </div>
  );
};
