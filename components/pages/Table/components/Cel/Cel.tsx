import { FC } from "react";

// libs
import cn from "classnames";

interface ICel {
  children: any
  classname?: string
}

export const Cel: FC<ICel> = ({ children, classname }) => {
  return (
    <div className={cn('w-full px-2 py-4 text-sm text-[#D9D9D9] overflow-hidden text-ellipsis', classname)}>
      {children}
    </div>
  )
}