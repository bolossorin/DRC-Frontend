import React from "react";

export const Pagination = () => {

  return (
    <div className='flex items-center gap-4 md:gap-6'>
      <div className='font-medium mr-1 md:mr-5'>
        1 – 20 of 123
      </div>
      <div className='flex items-center gap-9'>
        <div className='w-2 cursor-pointer transition-all opacity-50 hover:opacity-100'>
          <img src='/arrow.svg' alt='' />
        </div>
        <div className='w-2 cursor-pointer transition-all opacity-50 hover:opacity-100 rotate-180'>
          <img src='/arrow.svg' alt='' />
        </div>
      </div>
    </div>
  )
}