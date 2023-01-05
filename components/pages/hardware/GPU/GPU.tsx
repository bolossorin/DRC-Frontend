import { H4 } from "../../../common";
import React from "react";

export const GPU = () => {
  return (
    <div className='py-6 px-3 sm:p-6 bg-[#2F2F2F] rounded'>
      <H4 classname='flex items-center'>
        <img className='w-7 mr-4' src={'/gpu.svg'} alt='' />
        GPU
      </H4>
    </div>
  )
}