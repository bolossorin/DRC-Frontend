// libs
import React, { useEffect, useState } from "react";

// hooks
import { useQuery } from "@apollo/client";
import { useRegion } from "@/context/region";

// components
import { H2, Iteration, Layout, State } from "@/components/common";
import { Actions, Cell, Filters, Pagination, Table, TableSetting } from "@/components/pages/vessels";
import Link from "next/link";

// assets
import styles from "../components/pages/vessels/index.module.scss";
import { routes } from "@/utility/routes";
import { getExperiments } from "@/graphql/experiments/getExperiments";
import { onExperimentsChange } from "@/graphql/experiments/onExperimentsChange";

// types
import { SelectedElement } from "@/components/pages/vessels/Table/Table";
import { IFilter } from "@/utility/types";
import { IExperiment } from "@/graphql/types/experiment";
import { timeAgo } from "@/utility/timeAgo";

export const experimentsTableColumns = [
  {
    label: "Experiment Name",
    key: "experiment_name",
    hideByDefault: false,
    renderCell: (item: IExperiment, key: string) => (
      <Cell key={key}>
        <Link href={`${item.wandb_url}`} className="hover:underline">
          {item.experiment_name}
        </Link>
      </Cell>
    ),
    
  },
  {
    label: "Project",
    key: "project_name",
    renderCell: (item: IExperiment, key: string) => (
      <Cell key={key}>
        <Link href={`${item.wandb_project_url}`} className="hover:underline">
          {item.wandb_project_url}
        </Link>
      </Cell>
    ),

  },
  {
    label: "State",
    key: "state",
    renderCell: (item: IExperiment, key: string) => (
      <Cell key={key}>
        <State state={item.state} />
      </Cell>
    ),
  },
  {
    label: "Created",
    key: "created_at",
    renderCell: (item: IExperiment, key: string) => (
      <Cell classname="whitespace-nowrap" key={key}>
        {timeAgo(item.created_at)}
      </Cell>
    ),
  },
  {
    label: "Iteration",
    key: "gpu_names",
    renderCell: (item: IExperiment, key: string) => (
      <Cell key={key}>
        <Iteration iterCurrent={item.iter_current} iterEnd={item.iter_end} />
      </Cell>
    ),
  },
  {
    label: "Vessel Name",
    key: "vessel_label",
    renderCell: (item: IExperiment, key: string) => (
      <Cell key={key}>
        <Link href={`${routes.vessels}/${item.session_id}`} className="hover:underline">
          {item.vessel_label}
        </Link>
      </Cell>
    ),
  },
  {
    label: "Vessel ID",
    key: "session_id",
    renderCell: (item: IExperiment, key: string) => (
      <Cell key={key}>
        <Link href={`${routes.vessels}/${item.session_id}`} className="hover:underline">
          {item.session_id}
        </Link>
      </Cell>
    ),
  },
];

export default function Experiments() {
  const [region] = useRegion();

  const { data, subscribeToMore } = useQuery<{ my_experiments: IExperiment[] }>(getExperiments, {
    variables: {
      limit: 10000,
      offset: 0,
      region,
    },
  });

  const [isStopModal, setIsStopModal] = useState(false);
  const [isCreateExperiment, setIsCreateExperiment] = useState(false);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [currentSelected, setCurrentSelected] = useState<SelectedElement[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [columnSettings, setColumnSettings] = useState(
    experimentsTableColumns.map((c) => ({
      label: c.label,
      key: c.key,
      checked: !c.hideByDefault,
    }))
  );

  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });

  const [paginatedExperiments, setPaginatedExperiments] = useState<IExperiment[] | null>([]);

  useEffect(() => {
    const experiments = data?.my_experiments.slice(pagination.offset, pagination.offset + pagination.limit);
    if (experiments) setPaginatedExperiments(experiments);
  }, [data?.my_experiments, pagination]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: onExperimentsChange,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
  
        const subscriptionExperiments = subscriptionData.data?.my_experiments ?? [];
  
        let updatedExperiments: IExperiment[] = [];
  
        if (prev?.my_experiments) {
          updatedExperiments = prev.my_experiments.map((experiment) => {
            const updatedExperiment = subscriptionExperiments.find((s) => s.id === experiment.id);
            if (updatedExperiment) return updatedExperiment;
            return experiment;
          });
        }
  
        const newExperiments = subscriptionExperiments.filter((experiment) => {
          return !prev?.my_experiments?.find((prevExperiment) => prevExperiment.id === experiment.id);
        });
  
        return {
          my_experiments: [...newExperiments, ...(Array.isArray(updatedExperiments) ? updatedExperiments : [])],
        };
      },
    });
  
    return () => unsubscribe();
  }, [subscribeToMore]);
  
  const handlePageChange = (offset: number) => {
    setPagination((prev) => ({ ...prev, offset }));
  };

  const handleChangePageLimit = (limit: number) => {
    setPagination({ offset: 0, limit });
  };

  return (
    <Layout
      title="Experiments | Deep Render Cloud"
      description="Experiments | Deep Render Cloud"
      label={<H2 classname="!mb-0">Experiments</H2>}
    >
      <div className="px-8 pt-6 pb-5 flex flex-wrap items-center justify-between gap-6">
        {/*<Search placeholder="Search for vessels by attribute..." setFilters={setFilters} filters={filters} />*/}
        <div className="grow" />
        <div className="flex flex-wrap items-center gap-4 md:gap-10">
          <Actions currentSelected={currentSelected} setIsStopModal={setIsStopModal} hideVsCode />
          <Pagination
            totalCount={data?.my_experiments.length ?? 0}
            limit={pagination.limit}
            offset={pagination.offset}
            onPageChange={handlePageChange}
          />
          <div className="relative z-10 w-6 group">
            <img
              className="opacity-50 group-hover:opacity-100 cursor-pointer transition-all"
              src="/setting.svg"
              alt=""
            />
            <TableSetting
              onPageLimitChange={handleChangePageLimit}
              pageLimit={pagination.limit}
              columnSettings={columnSettings}
              setColumnSettingsList={setColumnSettings}
            />
          </div>
        </div>
      </div>
      {filters.length > 0 && (
        <div className="px-6 pb-6">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      )}
      <div className={styles.table}>
        <Table<IExperiment>
          className="w-full overflow-y-auto"
          items={paginatedExperiments}
          columns={experimentsTableColumns.filter(
            (column) => !!columnSettings.find((s) => s.key === column.key)?.checked
          )}
          selected={currentSelected}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          setCurrentSelected={setCurrentSelected}
          onSessionStop={(id: string) => {}}
        />
      </div>
    </Layout>
  );
}
