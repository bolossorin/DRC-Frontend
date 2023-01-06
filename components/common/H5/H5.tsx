import { FC } from "react";

// libs
import cn from "classnames";

interface IH5 {
  children: any
  classname?: string
  onClick?: () => void
}

export const H5: FC<IH5> = ({ children, classname, onClick }) => {
  return (
    <h5 onClick={onClick} className={cn('text-base font-bold mb-2', classname)}>{children}</h5>
  )
}