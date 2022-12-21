import { FC } from "react";

// libs
import cn from "classnames";

interface IInput {
  classname?: any
  type: string
  placeholder: string
  icon: string
}

export const Input: FC<IInput> = ({ classname, type, placeholder, icon }) => {
  return (
    <label className='relative block'>
      {icon && <img className='w-4 absolute z-10 left-3 top-1/2 -translate-y-1/2' src={icon} alt='' />}
      <input
        type={type}
        className={cn('text-sm text-white placeholder:text-[#C0C0C0] px-5 py-3 rounded bg-[#3C3C3C] w-full', { 'pl-10': icon }, classname)}
        placeholder={placeholder} />
    </label>
  )
}