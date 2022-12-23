import React from "react";

// libs
import cn from "classnames";

// components
import { H5, Paragraph, State } from "../../../common";
import { Updated } from "../../../common/Icons";
import { INotification } from "../../../../utility/types";

// assets
import styles from './Notifications.module.scss'

interface INotifications {
  classname: string;
  setNotifications: (value: INotification[]) => void
  notifications: INotification[]
}

export const Notifications = ({ classname, notifications, setNotifications }: INotifications) => {

  return (
    <div
      className={cn('hidden absolute z-20 w-[400px] max-w-[90vw] right-0 bottom-0 translate-y-full bg-[#3C3C3C] border border-[#686868]', classname)}>
      <div className='flex items-center p-4 border-b border-[#686868]'>
        <H5 classname='!mb-0'>Notifications</H5>
        <Paragraph classname='!mb-0 text-sm ml-4'>({notifications.length})</Paragraph>
        <div
          className='ml-auto cursor-pointer hover:opacity-50 select-none transition-all'
          onClick={() => setNotifications([])}>
          <Paragraph classname='!mb-0 text-sm whitespace-nowrap'>Read All</Paragraph>
        </div>
      </div>
      <div className='overflow-auto'>
        <div className='max-h-[540px]'>
          {notifications.length > 0 ? notifications.map((notification, index) => (
              <div key={index} className='p-4 border-b border-[#686868]'>
                <div className='flex items-center'>
                  <div className='w-8'>
                    <img src={notification.icon} alt='' />
                  </div>
                  <div className='ml-7 flex-1'>
                    <div
                      className={cn('flex items-center border-b border-[#535353] pb-2 mb-4 ', styles[notification.status])}>
                      <div className='w-6 mr-4'>
                        <Updated />
                      </div>
                      State Updated
                      <div
                        onClick={() => setNotifications([...notifications.slice(0, index), ...notifications.slice(index + 1)])}
                        className='w-3 ml-auto cursor-pointer opacity-50 transition-all hover:opacity-100'>
                        <img src='/close.svg' alt='' />
                      </div>
                    </div>
                    <Paragraph classname='!text-sm'>{notification.message}</Paragraph>
                    {notification.state && <div className='flex flex-wrap items-center gap-3'>
                      <Paragraph classname='!mb-0 !text-sm text-[#D9D9D9]'>has entered state</Paragraph>
                      <State fontSize='text-sm' state={notification.state} />
                    </div>}
                    {notification.subMessage &&
                      <Paragraph classname='!mb-0 !text-sm text-[#D9D9D9] mt-2'>{notification.subMessage}</Paragraph>}
                  </div>
                </div>
              </div>
            ))
            : <Paragraph classname='!mb-0 !text-sm text-[#D9D9D9] p-4 text-center'>Empty</Paragraph>}
        </div>
      </div>
    </div>
  )
}