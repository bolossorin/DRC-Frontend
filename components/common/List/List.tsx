import React from "react";

// libs
import cn from "classnames";

// assets
import styles from './List.module.scss'

interface IList {
  classname: string
  condition?: string
  title?: string
  list: any[]
  size: 'small' | 'big'
  onClick?: (value:string) => void
}

export const List = ({ classname, list, title, condition, size, onClick }: IList) => {
  return (
    <ul
      className={cn('hidden w-max absolute z-20 top-4 left-4 rounded border border-[#686868] bg-[#3D3C3C]', styles.list, { [styles.withTitle]: title }, styles[size], classname)}>
      {condition && <li
        className={cn('flex items-center p-4 border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none', styles.condition)}>
        {condition}
      </li>}
      {title && <li
        className={cn('flex items-center p-4 border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none', styles.title)}>
        {title}
      </li>}
      {list.map(item =>
        <li
          onClick={()=> onClick ? onClick(item.value) :null}
          key={item.title}
          className='flex items-center border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none'>
          {item.icon && <img className='w-4 mr-3' src={item.icon} alt='' />}
          <p dangerouslySetInnerHTML={{ __html: item.title }} />
        </li>)}
    </ul>
  )
}