import React, { FC } from "react";

interface ICheckbox {
  classname?: any
  onChange?: () => void
  checked: boolean
}

export const Checkbox: FC<ICheckbox> = ({ onChange, checked }) => {
  return (
    <label className='flex cursor-pointer relative inline-flex group'>
      <input className='bg-transparent peer' type='checkbox' onChange={onChange} checked={checked} hidden />
      <img
        className='hidden peer-checked:block absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%]'
        src='/checkbox.svg' alt='' />
      <span
        className='block w-4 h-4 bg-transparent border border border-[#686868] rounded-sm peer-checked:bg-[#6CF202] peer-checked:border-[#6CF202] group-hover:border-[#6CF202]' />
    </label>
  )
}