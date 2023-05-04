import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { getSessions } from "@/graphql/sessions/getSessions";
import { stopSession } from "@/graphql/sessions/stopSession";
import { createSession } from "@/graphql/sessions/createSession";
import { CreateSessionArgs, ISession } from "@/graphql/types/session";
import { onSessionsChange } from "@/graphql/sessions/onSessionsChange";
import { SelectedVessel } from "@/components/pages/vessels/Table/Table";

// components
import { Layout, State, VesselTitle } from "@/components/common";
import {
  Actions,
  Cell,
  CreateVessels,
  Filters,
  Pagination,
  /*Search,*/
  Table,
  TableSetting,
} from "@/components/pages/vessels";
import { IFilter } from "@/utility/types";
import { StopVesselsModal, VesselAddedModal } from "@/components/common/Modals";
import { VesselAddError } from "@/components/common/Modals/VesselAddError.tsx/VesselAddError";

import { useRegion } from "@/context/region";
import { inactiveSessionStatuses } from "@/utility/inactiveSessionStatuses";
import { routes } from "@/utility/routes";
import Link from "next/link";

// assets
import styles from "../../components/pages/vessels/index.module.scss";
import { onSessionsLogsChange } from "@/graphql/sessions/onSessionsLogsChange";

export const sessionsTableColumns = [
  {
    label: "Vessel ID",
    key: "id",
    renderCell: (item: ISession, key: string) => (
      <Cell key={key}>
        <Link href={`${routes.vessels}/${item.id}`} className="hover:underline">
          {item.id}
        </Link>
      </Cell>
    ),
    hideByDefault: true,
  },
  {
    label: "Name",
    key: "name",
    renderCell: (item: ISession, key: string) => (
      <Cell key={key}>
        <Link href={`${routes.vessels}/${item.id}`} className="hover:underline">
          {item.name}
        </Link>
      </Cell>
    ),
  },
  {
    label: "State",
    key: "state",
    renderCell: (item: ISession, key: string) => (
      <Cell key={key}>
        <State state={item.state} />
      </Cell>
    ),
  },
  { label: "Queue", key: "queue" },
  { label: "Docker Image", key: "image" },
  {
    label: "GPUs",
    key: "gpu_names",
    renderCell: (item: ISession, key: string) => (
      <Cell key={key}>
        <ul className="list-disc">
          {item.gpu_names.map((gpu, index) => (
            <li className="mx-4" key={`${gpu}-${index}`}>
              {gpu}
            </li>
          ))}
        </ul>
      </Cell>
    ),
  },
  {
    label: "GPU Util",
    key: "avg_util_percent",
    renderCell: (item: ISession, key: string) => <Cell key={key}>{item.gpu_log?.avg_util_percent ?? 0}%</Cell>,
  },
  {
    label: "GPU Memory",
    key: "avg_memory_util_percent",
    renderCell: (item: ISession, key: string) => <Cell key={key}>{item.gpu_log?.avg_memory_util_percent ?? 0}%</Cell>,
  },
  {
    label: "Created At",
    key: "created_at",
    renderCell: (item: ISession, key: string) => (
      <Cell key={key}>{new Date(item.created_at).toLocaleString("en-US")}</Cell>
    ),
  },
];

export default function Vessels() {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<SelectedVessel[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [isStopModal, setIsStopModal] = useState(false);
  const [isAddedModal, setIsAddedModal] = useState(false);
  const [isAddedErrorModal, setIsAddedErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateVessels, setIsCreateVessels] = useState(false);
  const [countVessels, setCountVessels] = useState(1);

  const [sortBy] = useState("modified_at");

  const [columnSettings, setColumnSettings] = useState(
    sessionsTableColumns.map((c) => ({
      label: c.label,
      key: c.key,
      checked: !c.hideByDefault,
    }))
  );

  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });

  const handlePageChange = (offset: number) => {
    setPagination((prev) => ({ ...prev, offset }));
  };

  const handleChangePageLimit = (limit: number) => {
    setPagination({ offset: 0, limit });
  };

  const [region] = useRegion();

  const { data, refetch, subscribeToMore } = useQuery<{
    my_sessions: ISession[];
  }>(getSessions, {
    variables: {
      limit: 10000,
      offset: 0,
      sort_by: sortBy,
      ...(region && { region }),
    },
    fetchPolicy: "network-only",
  });

  const [paginatedSessions, setPaginatedSessions] = useState<ISession[] | null>(null);

  useEffect(() => {
    const sessions = data?.my_sessions.slice(pagination.offset, pagination.offset + pagination.limit);
    if (sessions) setPaginatedSessions(sessions);
  }, [data?.my_sessions, pagination]);

  useEffect(() => {
    const subscribeToSessions = subscribeToMore({
      document: onSessionsChange,
      variables: { region },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionSessions = subscriptionData.data?.my_sessions ?? [];
        const updatedSessions: ISession[] = prev?.my_sessions?.map((session) => {
          const updatedSession = subscriptionSessions.find((s) => s.id === session.id);
          if (updatedSession) return { ...updatedSession, gpu_log: session.gpu_log };
          return session;
        });
        const newSessions = subscriptionSessions.filter(
          (session) => !prev.my_sessions.find((prev) => prev.id === session.id)
        );
        return {
          my_sessions: [...newSessions, ...updatedSessions],
        };
      },
    });

    const subscribeToLogs = subscribeToMore<{
      my_logs: { session_id: string; avg_util_percent: number; avg_memory_util_percent: number }[];
    }>({
      document: onSessionsLogsChange,
      variables: { region },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionLogs = subscriptionData.data?.my_logs ?? [];
        const updatedSessions: ISession[] = prev?.my_sessions?.map((session) => {
          const updatedLogs = subscriptionLogs.find((log) => log.session_id === session.id);
          if (updatedLogs)
            return {
              ...session,
              gpu_log: {
                avg_util_percent: updatedLogs.avg_util_percent,
                avg_memory_util_percent: updatedLogs.avg_memory_util_percent,
              },
            };
          return session;
        });
        return { my_sessions: updatedSessions };
      },
    });

    return () => {
      subscribeToSessions();
      subscribeToLogs();
    };
  }, [region, subscribeToMore]);

  const [stopSessionMutation] = useMutation(stopSession, {
    onError: (errors) => console.log(errors),
  });

  const stopSessions = async () => {
    const requests: Promise<any>[] = [];
    currentSelected.forEach((session) =>
      requests.push(
        stopSessionMutation({
          variables: {
            id: session.id,
          },
        })
      )
    );
    await Promise.all(requests);
    refetch();
    setIsStopModal(false);
    setCurrentSelected([]);
  };

  const [writeSession] = useMutation(createSession, {
    onError: (error) => console.log(error),
  });

  const createSessions = async (sessionsData: CreateSessionArgs[]) => {
    const requests: Promise<any>[] = [];
    sessionsData.forEach((s) =>
      requests.push(
        writeSession({
          variables: {
            label: s.label,
            n_gpus: s.n_gpus,
            queue: s.queue,
            image: s.image,
            privileged: s.privileged,
            monitor_by_undertaker: s.monitor_by_undertaker,
            ...(region && { region }),
          },
        })
      )
    );
    const result = await Promise.all(requests);
    refetch();
    if (!result.some((r) => r.errors)) {
      setIsAddedModal(true);
      setIsCreateVessels(false);
    } else {
      setIsAddedErrorModal(true);
      setErrorMessage(result[0].errors.message);
    }
  };

  const getVsCodeLink = () => {
    if (currentSelected.length !== 1) return;
    const session = data?.my_sessions?.find((s: ISession) => s.id === currentSelected[0].id);
    if (session) {
      if (inactiveSessionStatuses.includes(session.state)) {
        return;
      }
      return session.fqdn;
    }
  };

  return (
    <Layout
      title="Vessels | Deep Render Cloud"
      description="Vessels | Deep Render Cloud"
      label={<VesselTitle count={data?.my_sessions.length ?? 0} />}
    >
      {isStopModal && <StopVesselsModal setIsOpen={setIsStopModal} vessels={currentSelected} onStop={stopSessions} />}
      {isAddedModal && (
        <VesselAddedModal countVessels={countVessels} setIsOpen={setIsAddedModal} setCountVessels={setCountVessels} />
      )}
      {isCreateVessels && (
        <CreateVessels
          countVessels={countVessels}
          setCountVessels={setCountVessels}
          setIsOpen={setIsCreateVessels}
          createVessels={createSessions}
          region={region}
        />
      )}
      {isAddedErrorModal && <VesselAddError setIsOpen={setIsAddedErrorModal} message={errorMessage} />}
      <div className="px-8 pt-6 pb-5 flex flex-wrap items-center justify-between gap-6">
        {/*<Search placeholder="Search for vessels by attribute..." setFilters={setFilters} filters={filters} />*/}
        <div className="grow" />
        <div className="flex flex-wrap items-center gap-4 md:gap-10">
          <Actions
            currentSelected={currentSelected}
            setIsStopModal={setIsStopModal}
            setIsCreateVessels={setIsCreateVessels}
            vsCodeLink={getVsCodeLink()}
          />
          <Pagination
            totalCount={data?.my_sessions.length ?? 0}
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
        <Table
          className="w-full"
          items={paginatedSessions}
          columns={sessionsTableColumns.filter((column) => !!columnSettings.find((s) => s.key === column.key)?.checked)}
          selected={currentSelected}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          setCurrentSelected={setCurrentSelected}
          onSessionStop={(id: string) =>
            stopSessionMutation({
              variables: {
                id,
              },
            })
          }
        />
      </div>
    </Layout>
  );
}
