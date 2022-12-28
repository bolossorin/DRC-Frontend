import React from "react";

// components
import { H4, H5, H6, Input } from "../../../common";

export const Connection = () => {
  return (
    <div className='p-6 pt-4 w-full 2xl:w-4/12 flex flex-col'>
      <div className='p-6 bg-[#2F2F2F] rounded flex-1'>
        <H4 classname='!mb-6 flex items-center'>
          <img className='w-5 mr-4' src={'/link.svg'} alt='' />
          Connection
        </H4>
        <H5 classname='!mb-6'>SSH</H5>
        <H6>Command</H6>
        <Input type='text' value='ssh -i ~/.ssh/id_rsa -p 22 alex@100.86.104.174' />
      </div>
    </div>
  )
}