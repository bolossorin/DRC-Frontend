import React from "react";

// components
import { H4 } from "../../../common";

export const GPUTitle = () => {
  return (
    <H4 classname='!mb-6 flex items-center !text-xl'>
      <img className='w-7 mr-4' src={'/gpu.svg'} alt='' />
      GPU
    </H4>
  )
}