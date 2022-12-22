import { FC } from "react";

// libs
import cn from "classnames";

interface IInput {
  classname?: any
  type: string
  placeholder: string
  icon: string
  value: string
  setValue: (value: string) => void
  onKeyPress?: (value:any) => void
  onFocus?: () => void
}

export const Input: FC<IInput> = (
  {
    classname,
    type,
    placeholder,
    icon, value,
    setValue,
    onFocus,
    onKeyPress
  }) => {
  return (
    <label className='relative block'>
      {icon && <img className='w-4 absolute z-10 left-3 top-1/2 -translate-y-1/2' src={icon} alt='' />}
      <input
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        value={value}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        className={cn('text-sm text-white placeholder:text-[#C0C0C0] px-5 py-3 rounded bg-[#3C3C3C] border border-[#686868] w-full', { 'pl-10': icon }, classname)}
        placeholder={placeholder} />
    </label>
  )
}