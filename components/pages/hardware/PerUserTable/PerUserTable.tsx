import React from "react";

// libs
import cn from "classnames";

// components
import { Cel, CelHeader, Row } from "../../vessels";
import { H6, Paragraph } from "@/components/common";

// assets
import styles from "./PerUserTable.module.scss";

const headers = ['User', 'Used', 'Queue Usage'];
const rows = [
  {
    user: { image: '/images/aleksandar-cherganski.png', name: 'Aleksandar Cherganski' },
    used: 5,
    queue_usage: [
      { count: 1, title: 'titan_dryxzcxzc32k' },
      { count: 2, title: 'a100' },
      { count: 3, title: 'entropy' },
      { count: 4, title: '25gb' },
    ],
  },
  {
    user: { image: '/images/chri-besenburch.png', name: 'Chri Besenburch' },
    used: 4,
    queue_usage: [
      { count: 1, title: 'titan_dry32k' },
      { count: 2, title: 'a100' },
      { count: 3, title: 'entropy' },
      { count: 4, title: '25gb' },
    ],
  },
  {
    user: { image: '/images/vira-koshkina.png', name: 'Vira Koshkina' },
    used: 8,
    queue_usage: [
      { count: 1, title: 'titan_dry32k' },
      { count: 2, title: 'a100' },
      { count: 3, title: 'entropy' },
      { count: 4, title: '25gb' },
    ],
  },
]
export const PerUserTable = () => {
  return (
    <>
      <Row classname={cn(styles.row, styles.header)}>
        {headers.map(header => <CelHeader key={header}>{header}</CelHeader>)}
      </Row>
      {rows.map((row, index) => (
        <Row key={index} classname={styles.row}>
          <Cel>
            <div className='flex items-center'>
              <img className='w-7 mr-2' src={row.user.image} alt='' />
              <Paragraph classname='mb-0 overflow-hidden text-ellipsis'>{row.user.name}</Paragraph>
            </div>
          </Cel>
          <Cel>{row.used}</Cel>
          <Cel classname='relative'>
            {row.queue_usage.slice(0, 1).map((queue, index) =>
              <div key={index} className={styles.queueUsage}>
                {queue.count}
                <span className='mx-2 text-[#A4A4A4]'>x</span>
                <div className='overflow-hidden text-ellipsis text-[#A4A4A4]'>{queue.title}</div>
                <div
                  className='ml-auto group p-2 min-w-[36px] min-w-[40px] w-9 h-9 border-[3px] border-[#2f2f2f] bg-[#535353] rounded-full transition-all hover:border-[#A4A4A4]'>
                  <img className='h-full cursor-pointer' src={'/dots-horizontal.svg'} alt='' />
                  <div
                    className='hidden group-hover:block absolute z-10 right-0 bottom-4 translate-y-full w-max min-w-[200px] rounded bg-[#3C3C3C] max-h-[288px] overflow-auto'>
                    {row.queue_usage.map((user, index) =>
                      <div key={index} className='border-b border-[#A4A4A4] flex items-center py-3 mx-4'>
                        <div className='flex items-center'>
                          <Paragraph classname='!mb-0 text-[#D9D9D9]'>
                            {user.count}
                          </Paragraph>
                          <span className='mx-2 text-[#D9D9D9]'>x</span>
                          <H6 classname='!mb-0 !font-medium text-[#D9D9D9]'>{user.title}</H6>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            )}
          </Cel>
        </Row>
      ))}
    </>
  )
}