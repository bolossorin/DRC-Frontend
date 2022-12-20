import { FC } from "react";

// libs
import cn from "classnames";

interface IH2 {
  children: string
  classname: any
}

export const H2: FC<IH2> = ({ children, classname }) => {
  return (
    <h2 className={cn('text-[32px] font-bold mb-6', classname)}>
      {children}
    </h2>
  )
}