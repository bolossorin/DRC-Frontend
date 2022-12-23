import React, { useState } from "react";

// components
import { Layout } from "../../components/common";
import {
  Actions,
  CreateVessels,
  Filters,
  Pagination,
  Search,
  Table,
  TableSetting
} from "../../components/pages/vessels";
import { IFilter } from "../../utility/types";
import { StopVesselsModal, VesselAddedModal } from "../../components/common/Modals";

export default function Vessels() {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<{}[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [isStopModal, setIsStopModal] = useState(false);
  const [isAddedModal, setIsAddedModal] = useState(false);
  const [isCreateVessels, setIsCreateVessels] = useState(false);
  const [countVessels, setCountVessels] = useState(0);

  return (
    <Layout
      title='Vessels | Deep Render Cloud'
      description='Vessels | Deep Render Cloud'>
      {isStopModal && <StopVesselsModal setIsOpen={setIsStopModal} />}
      {isAddedModal && <VesselAddedModal countVessels={countVessels} setIsOpen={setIsAddedModal} />}
      {isCreateVessels &&
        <CreateVessels
          countVessels={countVessels}
          setCountVessels={setCountVessels}
          setIsOpen={setIsCreateVessels}
          setIsAddedModal={setIsAddedModal} />}
      <div className='px-6 pt-6 flex flex-wrap items-center justify-between  max-w-[1524px] gap-6'>
        <Search placeholder='Search for vessels by attribute...' setFilters={setFilters} filters={filters} />
        <div className='flex flex-wrap items-center gap-4 md:gap-8'>
          <Actions
            currentSelected={currentSelected}
            setIsStopModal={setIsStopModal}
            setIsCreateVessels={setIsCreateVessels} />
          <Pagination />
          <div className='relative z-10 w-6 group'>
            <img className='opacity-50 group-hover:opacity-100 cursor-pointer transition-all' src='/setting.svg'
                 alt='' />
            <TableSetting classname='group-hover:block' />
          </div>
        </div>
      </div>
      <div className='px-6 pb-6 pt-4'>
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <Table
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        setCurrentSelected={setCurrentSelected} />
    </Layout>
  )
}
