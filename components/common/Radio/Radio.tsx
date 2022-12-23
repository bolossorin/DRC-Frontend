import React, { FC } from "react";

// libs
import cn from "classnames";

// assets
import styles from './Radio.module.scss'

interface IRadio {
  classname?: any
  onChange?: () => void
  checked?: boolean
  label: string
  name: string
}

export const Radio: FC<IRadio> = ({ onChange, checked, label, name }) => {
  return (
    <label className={cn('relative flex items-center cursor-pointer relative inline-flex group', styles.radio)}>
      <input name={name} className='peer' type='radio' onChange={onChange} checked={checked} hidden />
      <div
        className={cn('relative w-4 h-4 border border-[#D9D9D9] rounded-full transition-all group-hover:border-white', styles.icon)}>
        <span
          className='block w-2 h-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute z-10 rounded-full transition-all' />
      </div>
      <span className='ml-4 text-sm select-none'>{label}</span>
    </label>
  )
}