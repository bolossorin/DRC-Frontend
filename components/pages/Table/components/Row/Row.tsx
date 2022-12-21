import { FC } from "react";

interface IRow {
  children: any
}

export const Row: FC<IRow> = ({ children }) => {
  return (
    <div className='flex items-center whitespace-nowrap border-b border-[#535353]'>{children}</div>
  )
}