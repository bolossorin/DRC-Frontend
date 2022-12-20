import { FC } from "react";

// libs
import cn from "classnames";

interface IH6 {
  children: string
  classname?: string
}

export const H6: FC<IH6> = ({ children, classname }) => {
  return (
    <h6 className={cn('text-sm font-bold mb-2', classname)}>{children}</h6>
  )
}