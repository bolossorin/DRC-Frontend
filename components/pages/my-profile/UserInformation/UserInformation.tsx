import React from "react";

// libs
import { useUser } from "@auth0/nextjs-auth0/client";

// components
import { H4 } from "@/components/common";

// assets
import styles from './UserInformation.module.scss';

export const UserInformation = () => {
  const { user }: any = useUser();

  return (
    <div className='w-full flex flex-wrap items-center gap-x-4 md:gap-x-14 mb-8'>
      <div className='relative w-40 mr-6 mb-4'>
        <img className='rounded-full overflow-hidden' src={user.picture} alt='' />
        <span className='absolute right-4 bottom-4 w-4 h-4 rounded-full bg-[#88E207]' />
      </div>
      <div className='w-full flex flex-wrap flex-1 justify-between items-end gap-x-4 max-w-[920px]'>
        <div className='w-full md:w-auto'>
          <H4 classname='text-xl'>{user.name}</H4>
          <ul className={styles.list}>
            <li>
              <span>Display Name:</span>
              <span className={styles.name}>
                {user.nickname}
                <img src={'./edit.svg'} className='w-3.5 ml-2 cursor-pointer transition-all hover:opacity-70' alt='' />
              </span>
            </li>
            <li><span>Position:</span>VP of Engineering</li>
            <li><span>Location:</span>Stockholm, Sweden 11:43 AM (UTC+2)</li>
          </ul>
        </div>
        <ul className={styles.list}>
          <li><span>Max GPUs:</span>10</li>
          <li><span>Slack ID:</span>{user.sid}</li>
          <li><span>Terminal Shell:</span>bin</li>
        </ul>
      </div>
    </div>
  )
}