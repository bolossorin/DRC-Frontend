import React from "react";

// libs
import cn from "classnames";

// components
import { Cel, CelHeader, Row } from "../../vessels";
import { H6, Paragraph } from "@/components/common";

// assets
import styles from "./PerQueueTable.module.scss";

const headers = ['Queue', 'Free', 'Used', 'Total', 'Users'];
const rows = [

  {
    queue: 'default',
    free: 0,
    used: 7,
    total: 8,
    users: [
      { image: 'images/jan-xu.png', name: 'Jan Xu', count: 1 },
      { image: 'images/arsalan-zafar.png', name: 'Arsalan Zafar', count: 2 },
    ],
  },
  {
    queue: '3090_dry32k',
    free: 0,
    used: 7,
    total: 8,
    users: [
      { image: '/images/chri-besenburch.png', name: 'Chri Besenburch', count: 3 },
      { image: '/images/aleksandar-cherganski.png', name: 'Aleksandar Cherganski', count: 4 },
      { image: '/images/alexander-lytchier.png', name: 'Alexander Lytchier', count: 5 },
      { image: '/images/vira-koshkina.png', name: 'Vira Koshkina', count: 6 },
      { image: '/images/jan-xu.png', name: 'Jan Xu', count: 7 },
      { image: '/images/arsalan-zafar.png', name: 'Arsalan Zafar', count: 8 },
    ],
  },
  {
    queue: '3090_dry32k',
    free: 0,
    used: 7,
    total: 8,
    users: [
      { image: '/images/aleksandar-cherganski.png', name: 'Aleksandar Cherganski', count: 4 },
      { image: '/images/alexander-lytchier.png', name: 'Alexander Lytchier', count: 5 },
      { image: '/images/arsalan-zafar.png', name: 'Arsalan Zafar', count: 8 },
    ],
  },
]
export const PerQueueTable = () => {
  return (
    <>
      <Row classname={cn(styles.row, styles.header)}>
        {headers.map(header => <CelHeader key={header}>{header}</CelHeader>)}
      </Row>
      {rows.map((row, index) => (
        <Row key={index} classname={styles.row}>
          <Cel>{row.queue}</Cel>
          <Cel>{row.free}</Cel>
          <Cel>{row.used}</Cel>
          <Cel>{row.total}</Cel>
          <Cel classname='relative'>
            <div className='flex items-center ml-3'>
              {row.users.slice(0, 4).map((user, index) =>
                <div
                  key={index}
                  className='group min-w-[36px] w-9 h-9 border-[3px] border-[#2f2f2f] rounded-full -ml-2 transition-all cursor-pointer hover:border-[#A4A4A4]'>
                  <img className='h-full object-cover' src={user.image} alt='' />
                  <div
                    className='hidden group-hover:flex items-center w-max min-w-[200px] py-3 px-4 absolute z-10 right-0 top-2 -translate-y-full rounded bg-[#3C3C3C]'>
                    <img className='mr-3 w-9' src={user.image} alt='' />
                    <div className=''>
                      <H6 classname='!mb-0 !font-medium'>{user.name}</H6>
                      <Paragraph classname='!mb-0 text-[#A4A4A4]'>x {user.count}</Paragraph>
                    </div>
                  </div>
                </div>
              )}
              {row.users.length >= 4 &&
                <div
                  className='group p-2 min-w[36px] w-9 h-9 border-[3px] border-[#2f2f2f] bg-[#535353] rounded-full -ml-3 transition-all hover:border-[#A4A4A4]'>
                  <img className='h-full cursor-pointer' src={'/dots-horizontal.svg'} alt='' />
                  <div
                    className='hidden group-hover:block absolute z-10 right-0 bottom-3 translate-y-full w-max min-w-[200px] rounded bg-[#3C3C3C] max-h-[300px] overflow-auto'>
                    {row.users.map((user, index) =>
                      <div key={index} className='border-b border-[#A4A4A4] flex items-center py-2 mx-4'>
                        <img className='mr-4 w-9' src={user.image} alt='' />
                        <div className=''>
                          <H6 classname='!mb-0 !font-medium'>{user.name}</H6>
                          <Paragraph classname='!mb-0 text-[#A4A4A4]'>x {user.count}</Paragraph>
                        </div>
                      </div>)}
                  </div>
                </div>}
            </div>
          </Cel>
        </Row>
      ))}
    </>
  )
}