import React, { useState } from "react";

// libs
import cn from "classnames";

// components
import { H6 } from "../../../common";
import { PerQueueTable, PerUserTable } from "../../hardware";

export const Usage = () => {
  const [showTab, setShowTab] = useState(1);
  return (
    <div className={'flex-1 border border-[#414040] rounded overflow-auto'}>
      <div className='min-w-[500px]'>
        <div className='flex items-center justify-between text-center border-b border-[#414040]'>
          <H6
            onClick={() => setShowTab(1)}
            classname={cn('!mb-0 w-1/2 p-4 cursor-pointer transition-all', { 'bg-[#414040]/40': showTab === 1 })}>
            Usage per Queue
          </H6>
          <H6
            onClick={() => setShowTab(2)}
            classname={cn('!mb-0 w-1/2 p-4 cursor-pointer transition-all', { 'bg-[#414040]/40': showTab === 2 })}>
            Usage per User
          </H6>
        </div>
        {showTab === 1 && <PerQueueTable />}
        {showTab === 2 && <PerUserTable />}
      </div>
    </div>
  )
}