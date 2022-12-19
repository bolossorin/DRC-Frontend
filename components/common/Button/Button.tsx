import { FC } from "react";

// libs
import cn from "classnames";

interface IButton {
  children: string
  classname?: string
  icon?: string
}

export const Button: FC<IButton> = ({ icon, classname, children }) => {
  return (
    <button
      type='button'
      className={cn('text-xl font-medium flex items-center justify-center p-4 bg-[#3C3C3C] rounded hover:bg-[#5e5c5c] transition-all', classname)}>
      {icon && <img className='w-6 mr-4' src={icon} alt='' />}
      {children}
    </button>
  )
}