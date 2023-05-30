import React from "react";
import { useQuery } from "@apollo/client";

// components
import { Title, Overall, Usage } from "..";

// assets
import { getOverallUsage, getSessionOverview, getQueueUsage } from "@/graphql/hardware";
import { IOverallUsageResponse, IQueueUsageResponse, ISessionOverviewResponse } from "@/graphql/types/hardware";

export const CPU = () => {
  const { data: overallUsageData } = useQuery<IOverallUsageResponse>(getOverallUsage, {
    variables: { compute_type: "cpu" },
  });

  const { data: queueUsageData } = useQuery<IQueueUsageResponse>(getQueueUsage, {
    variables: { compute_type: "cpu" },
  });

  const { data: sessionOverviewData } = useQuery<ISessionOverviewResponse>(getSessionOverview, {
    variables: { compute_type: "cpu" },
  });

  return (
    <div className="flex flex-col w-full 2xl:w-[49%] py-6 px-3 sm:p-7 bg-[#2C2C2C] rounded">
      <Title variant="cpu" />
      <Overall overall={overallUsageData?.overall_usage} />
      <Usage
        queueUsage={queueUsageData?.queue_usage ?? []}
        sessionsOverview={sessionOverviewData?.session_overview ?? []}
      />
    </div>
  );
};
