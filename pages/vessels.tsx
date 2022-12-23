import React, { useState } from "react";

// components
import { H2, Layout, Paragraph } from "../components/common";
import {
  Actions,
  Filters,
  Location,
  Notifications,
  Pagination,
  Search,
  Table,
  TableSetting
} from "../components/pages/vessels";
import { IFilter } from "../utility/types";
import { StopVesselsModal, VesselAddedModal } from "../components/common/Modals";

const notificationsInitial = [
  {
    status: 'success',
    message: 'Super Super Long Vessel Name!!',
    state: 'Tailscale Cooking',
    subMessage: '',
    icon: '/cube.svg'
  },
  {
    status: 'warning',
    message: 'Super Super Long Vessel Name!!',
    state: 'Warn Send',
    subMessage: '',
    icon: '/cube.svg'
  },
  {
    status: 'error',
    message: 'Super Super Long Vessel Name!!',
    state: 'Crashed',
    subMessage: 'Admin has been notified',
    icon: '/cube.svg'
  },
  {
    status: 'success',
    message: 'GPU allowance increased from 8 to 12',
    state: '',
    subMessage: '',
    icon: '/user.svg'
  },
  {
    status: 'error',
    message: 'Super Super Long Vessel Name!!',
    state: 'Crashed',
    subMessage: 'Admin has been notified',
    icon: '/cube.svg'
  },
  {
    status: 'success',
    message: 'GPU allowance increased from 8 to 12',
    state: '',
    subMessage: '',
    icon: '/user.svg'
  }
]
export default function Vessels() {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<{}[]>([]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [notifications, setNotifications] = useState(notificationsInitial);
  const [isStopModal, setIsStopModal] = useState(false);
  const [isAddedModal, setIsAddedModal] = useState(true);

  return (
    <Layout
      title='Vessels | Deep Render Cloud'
      description='Vessels | Deep Render Cloud'>
      {isStopModal && <StopVesselsModal setIsOpen={setIsStopModal} />}
      {isAddedModal && <VesselAddedModal setIsOpen={setIsAddedModal} />}
      <section>
        <div className='container'>
          <div className='flex flex-col min-h-screen py-10 md:px-10'>
            <div className='flex items-center mb-6 w-full justify-between max-w-[1500px]'>
              <div className='flex items-center'>
                <H2 classname='mb-0'>Vessels</H2>
                <Paragraph classname='text-xl ml-4 !mb-0 relative top-0.5'>(25)</Paragraph>
              </div>
              <div className='flex items-center'>
                <div className='ml-2'>
                  <Location />
                </div>
                <div className='ml-6 relative w-4 group'>
                  {notifications.length > 0 && <span
                    className='absolute z-10 -right-1.5 -top-1.5 w-2 h-2 rounded-full bg-[#CA3C3C]' />}
                  <img
                    className='cursor-pointer opacity-50 group-hover:opacity-100 transition-all' src='/bell.svg'
                    alt='' />
                  <Notifications
                    setNotifications={setNotifications}
                    notifications={notifications}
                    classname='group-hover:block' />
                </div>
              </div>
            </div>
            <div className='border border-[#535353] bg-[#282828] flex-1 flex flex-col'>
              <div className='px-6 pt-6 flex flex-wrap items-center justify-between  max-w-[1524px] gap-6'>
                <Search setFilters={setFilters} filters={filters} />
                <div className='flex flex-wrap items-center gap-4 md:gap-8'>
                  <Actions
                    currentSelected={currentSelected}
                    setIsStopModal={setIsStopModal}
                    setIsAddedModal={setIsAddedModal} />
                  <Pagination />
                  <div className='relative z-10 w-6 group'>
                    <img className='opacity-50 group-hover:opacity-100 cursor-pointer transition-all' src='/setting.svg'
                         alt='' />
                    <TableSetting classname='group-hover:block' />
                  </div>
                </div>
              </div>
              <Filters filters={filters} setFilters={setFilters} />
              <Table
                selectAll={selectAll}
                setSelectAll={setSelectAll}
                setCurrentSelected={setCurrentSelected} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
