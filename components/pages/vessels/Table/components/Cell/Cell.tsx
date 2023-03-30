import { FC } from "react";

// libs
import cn from "classnames";

interface ICell {
  children: any
  classname?: string
}

export const Cell: FC<ICell> = ({ children, classname, colspan }) => {
  return (
    <td colSpan={colspan} className={cn('px-2 py-7 text-sm text-[#D9D9D9] cell', classname)}>
      {children}
    </td>
  )
}