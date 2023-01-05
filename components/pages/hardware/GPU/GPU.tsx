import React from "react";

// components
import { GPUTitle, Overall, Usage } from "../../hardware";

export const GPU = () => {
  return (
    <div className='flex flex-col w-full 2xl:w-[48%] py-6 px-3 sm:p-6 bg-[#2C2C2C] rounded'>
      <GPUTitle />
      <Overall />
      <Usage />
    </div>
  )
}