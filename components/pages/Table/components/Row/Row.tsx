import { FC } from "react";

// libs
import cn from "classnames";

interface IRow {
  children: any
  classname?: string
}

export const Row: FC<IRow> = ({ children, classname }) => {
  return (
    <div
      className={cn('flex items-center whitespace-nowrap px-6 border-b border-[#535353] hover:bg-[#2F2F2F] transition-all', classname)}>
      {children}
    </div>
  )
}