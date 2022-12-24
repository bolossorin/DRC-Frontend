import { FC } from "react";

// libs
import cn from "classnames";

interface IH4 {
  children: any
  classname?: string
  onClick?: () => void
}

export const H4: FC<IH4> = ({ children, classname, onClick }) => {
  return (
    <h4 onClick={onClick} className={cn('text-2xl font-bold mb-2', classname)}>{children}</h4>
  )
}