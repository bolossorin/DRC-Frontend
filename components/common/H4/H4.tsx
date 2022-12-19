import { FC } from "react";

interface IH4 {
  children: string
}

export const H4: FC<IH4> = ({ children }) => {
  return (
    <h4 className='text-2xl font-bold mb-2'>{children}</h4>
  )
}