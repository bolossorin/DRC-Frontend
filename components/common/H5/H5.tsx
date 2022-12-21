import { FC } from "react";

// libs
import cn from "classnames";

interface IH5 {
  children: any
  classname?: string
}

export const H5: FC<IH5> = ({ children, classname }) => {
  return (
    <h5 className={cn('text-base font-bold mb-2', classname)}>{children}</h5>
  )
}