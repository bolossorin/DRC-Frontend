import React, { useState } from "react";

// libs
import cn from "classnames";

// components
import { Button, H4, State } from "../../../common";
import { StopVesselsModal } from "../../../common/Modals";

// assets
import styles from './Information.module.scss'

export const Information = () => {
  const [isStopModal, setIsStopModal] = useState(false);

  return (
    <div className={cn('p-2 md:p-6 md:pb-0 w-full', styles.information)}>
      {isStopModal && <StopVesselsModal setIsOpen={setIsStopModal} />}
      <div className='px-2 md:px-6 pt-5 pb-2 bg-[#2F2F2F] rounded'>
        <div className='flex flex-wrap gap-4 items-center justify-between mb-4'>
          <H4 classname='!mb-0 flex items-center'>
            <img className='w-8 mr-4' src={'/cube-green.svg'} alt='' />
            Super super long vessel name!!
          </H4>
          <div className='flex flex-wrap gap-4 md:gap-8 items-center w-full sm:w-auto'>
            <Button
              size='medium'
              classname='w-full sm:w-auto'
              icon='/vs-code-white.svg'
              color='blue'>
              VS Code
            </Button>
            <Button
              onClick={() => setIsStopModal(true)}
              size='medium'
              classname='w-full sm:w-auto'
              icon='/stop-empty.svg'
              color='red'>
              Stop
            </Button>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-x-10 xl:gap-x-32 gap-y-5 md:gap-y-10'>
          <ul className={styles.list}>
            <li className='flex items-center'>
              <span>State :</span> <State state='Running' fontSize='text-sm' />
            </li>
            <li><span>Vessel ID:</span>68333578-13a5-43df-a839-49ffed149988</li>
            <li><span>Created at:</span>2022-09-05T06:36:01.205Z</li>
            <li><span>Modified at:</span>2022-08-05T06:24:01.205Y</li>
            <li><span>IP:</span>100.86.104.174</li>
            <li><span>Port:</span>22</li>
          </ul>
          <ul className={styles.list}>
            <li className='flex items-start'>
              <span className='!w-20'>GPUs:</span>
              <ul>
                <li>RTX 3090</li>
                <li>RTX 3090</li>
                <li>RTX 3090</li>
                <li>RTX 3090</li>
              </ul>
            </li>
          </ul>
          <ul className={styles.list}>
            <li><span>Queue:</span>Titan_dry32k</li>
            <li className='font-medium !text-[#F6F6F6]'>
              <span>Docker Image:</span>vessel:v2.7.0.wdbiweubqoubdwwk
            </li>
            <li><span>GPU Utilisation:</span>100%</li>
            <li><span>GPU Memory:</span>100%</li>
          </ul>
        </div>
      </div>
    </div>
  )
}