import React, { useState } from "react";

// components
import { Paragraph, H2 } from "../../common";
import { Location, Notifications } from "../../pages/vessels";

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

export const Header = () => {
  const [notifications, setNotifications] = useState(notificationsInitial);

  return (
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
  )
}