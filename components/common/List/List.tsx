import React from "react";

// libs
import cn from "classnames";

const list = [
  { icon: '/stop.svg', title: 'Stop' },
  { icon: '/vs-code.svg', title: 'VS Code' },
  { icon: '/ssh.svg', title: 'Copy SSH Config' },
  { icon: '/ssh.svg', title: 'Copy SSH Command' },
]

interface IList {
  classname: string
}

export const List = ({ classname }: IList) => {
  return (
    <ul
      className={cn('hidden w-max absolute z-20 top-4 left-4 rounded border border-[#686868] bg-[#3D3C3C]', classname)}>
      {list.map(item =>
        <li
          key={item.title}
          className='flex items-center p-4 border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none'>
          <img className='w-4 mr-3' src={item.icon} alt='' />
          {item.title}
        </li>)}
    </ul>
  )
}