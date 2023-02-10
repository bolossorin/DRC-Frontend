import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { getSessions } from '../../graphql/sessions/getSessions';
import { stopSession } from '../../graphql/sessions/stopSession';

// components
import { Layout, VesselTitle } from '../../components/common';
import {
  Actions,
  CreateVessels,
  Filters,
  Pagination,
  Search,
  Table,
  TableSetting,
} from '../../components/pages/vessels';
import { IFilter } from '../../utility/types';
import { StopVesselsModal, VesselAddedModal } from '../../components/common/Modals';

export default function Vessels() {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [isStopModal, setIsStopModal] = useState(false);
  const [isAddedModal, setIsAddedModal] = useState(false);
  const [isCreateVessels, setIsCreateVessels] = useState(false);
  const [countVessels, setCountVessels] = useState(0);

  const { data, refetch } = useQuery(getSessions, {
    variables: {
      state: [],
      limit: 10,
      offset: 0,
      session_type: 'all',
      region: 'uk-south-1',
    },
  });

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

  return (
    <Layout title="Vessels | Deep Render Cloud" description="Vessels | Deep Render Cloud" label={<VesselTitle />}>
      {isStopModal && <StopVesselsModal setIsOpen={setIsStopModal} vessels={currentSelected} onStop={stopSessions} />}
      {isAddedModal && <VesselAddedModal countVessels={countVessels} setIsOpen={setIsAddedModal} />}
      {isCreateVessels && (
        <CreateVessels
          countVessels={countVessels}
          setCountVessels={setCountVessels}
          setIsOpen={setIsCreateVessels}
          setIsAddedModal={setIsAddedModal}
        />
      )}
      <div className="px-6 pt-6 pb-5 flex flex-wrap items-center justify-between  max-w-[1524px] gap-6">
        <Search placeholder="Search for vessels by attribute..." setFilters={setFilters} filters={filters} />
        <div className="flex flex-wrap items-center gap-4 md:gap-10">
          <Actions
            currentSelected={currentSelected}
            setIsStopModal={setIsStopModal}
            setIsCreateVessels={setIsCreateVessels}
          />
          <Pagination />
          <div className="relative z-10 w-6 group">
            <img
              className="opacity-50 group-hover:opacity-100 cursor-pointer transition-all"
              src="/setting.svg"
              alt=""
            />
            <TableSetting classname="group-hover:block" />
          </div>
        </div>
      </div>
      {filters.length > 0 && (
        <div className="px-6 pb-6">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      )}
      <Table
        items={data?.my_sessions ?? []}
        selected={currentSelected}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        setCurrentSelected={setCurrentSelected}
      />
    </Layout>
  );
}
