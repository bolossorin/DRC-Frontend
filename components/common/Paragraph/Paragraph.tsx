import { FC } from "react";

// libs
import cn from "classnames";

interface IParagraph {
  children: string
  classname?: string
}

export const Paragraph: FC<IParagraph> = ({ classname, children }) => {
  return (
    <p className={cn('text-base font-normal mb-2', classname)}>{children}</p>
  )
}