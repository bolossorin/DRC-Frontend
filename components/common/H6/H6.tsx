import { FC } from "react";

// libs
import cn from "classnames";

interface IH6 {
  children: string
  classname?: string
  onClick?: () => void
}

export const H6: FC<IH6> = ({ children, classname, onClick }) => {
  return (
    <h6 onClick={onClick} className={cn('text-sm font-bold mb-2', classname)}>
      {children}
    </h6>
  )
}