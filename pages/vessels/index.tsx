import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { getSessions } from "../../graphql/sessions/getSessions";
import { stopSession } from "../../graphql/sessions/stopSession";

// components
import { Layout, VesselTitle } from "../../components/common";
import {
  Actions,
  CreateVessels,
  Filters,
  Pagination,
  Search,
  Table,
  TableSetting,
} from "../../components/pages/vessels";
import { IFilter } from "../../utility/types";
import { StopVesselsModal, VesselAddedModal } from "../../components/common/Modals";

import { createSession } from "../../graphql/sessions/createSession";
import { CreateSessionArgs, ISession } from "../../graphql/types/session";
import { useRegion } from "../../context/region";
import { VesselAddError } from "../../components/common/Modals/VesselAddError.tsx/VesselAddError";
import { onSessionsChange } from "../../graphql/sessions/onSessionsChange";

const disabledVsCodeButtonStates = ["stopped", "crashed", "removed", "gpu_lost", "freed", "released", "stopping"];

export default function Vessels() {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [isStopModal, setIsStopModal] = useState(false);
  const [isAddedModal, setIsAddedModal] = useState(false);
  const [isAddedErrorModal, setIsAddedErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateVessels, setIsCreateVessels] = useState(false);
  const [countVessels, setCountVessels] = useState(0);

  const [sortBy, setSortBy] = useState("modified_at");

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

  const { data, refetch, subscribeToMore } = useQuery<{ my_sessions: ISession[] }>(getSessions, {
    variables: {
      limit: 10000,
      offset: 0,
      sort_by: sortBy,
      ...(region && { region }),
    },
    fetchPolicy: "network-only",
  });

  const [paginatedSessions, setPaginatedSessions] = useState<ISession[]>([]);

  useEffect(() => {
    if (data?.my_sessions.length) {
      const sessions = data.my_sessions.slice(pagination.offset, pagination.offset + pagination.limit);
      setPaginatedSessions(sessions);
    }
  }, [data?.my_sessions, pagination]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: onSessionsChange,
      variables: { region },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionSessions = subscriptionData.data?.my_sessions ?? [];
        const updatedSessions = prev.my_sessions.map((session) => {
          const updatedSession = subscriptionSessions.find((s) => s.id === session.id);
          if (updatedSession) return updatedSession;
          return session;
        });
        return {
          my_sessions: updatedSessions,
        };
      },
    });

    return () => unsubscribe();
  }, [region]);

  const [stopSessionMutation] = useMutation(stopSession, {
    onError: (errors) => console.log(errors),
  });

  const stopSessions = async () => {
    const requests: Promise<any>[] = [];
    currentSelected.forEach((id) =>
      requests.push(
        stopSessionMutation({
          variables: {
            id,
          },
        })
      )
    );
    await Promise.all(requests);
    refetch();
    setIsStopModal(false);
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

  const openFqdn = (id: string) => {
    const sesssion = data?.my_sessions?.find((s: ISession) => s.id === id);
    if (sesssion) {
    }
  };

  const getVsCodeLink = () => {
    if (currentSelected.length !== 1) return;
    const session = data?.my_sessions?.find((s: ISession) => s.id === currentSelected[0]);
    if (session) {
      if (disabledVsCodeButtonStates.includes(session.state)) {
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
        />
      )}
      {isAddedErrorModal && <VesselAddError setIsOpen={setIsAddedErrorModal} message={errorMessage} />}
      <div className="px-6 pt-6 pb-5 flex flex-wrap items-center justify-between  max-w-[1524px] gap-6">
        <Search placeholder="Search for vessels by attribute..." setFilters={setFilters} filters={filters} />
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
              classname="group-hover:block"
              onPageLimitChange={handleChangePageLimit}
              pageLimit={pagination.limit}
            />
          </div>
        </div>
      </div>
      {filters.length > 0 && (
        <div className="px-6 pb-6">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      )}
      <Table
        items={paginatedSessions}
        selected={currentSelected}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        setCurrentSelected={setCurrentSelected}
      />
    </Layout>
  );
}
