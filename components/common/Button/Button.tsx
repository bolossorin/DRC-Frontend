import { FC } from "react";

// libs
import cn from "classnames";

// assets
import styles from './Button.module.scss'

interface IButton {
  children: string
  classname?: string
  icon?: string
  disabled?: boolean
  size: 'small' | 'medium' | 'big'
  color: 'green' | 'grey' | 'red' | 'blue' | 'lightGrey'
  onClick?: () => void
}

export const Button: FC<IButton> = (
  {
    icon,
    classname,
    children,
    size,
    onClick,
    color,
    disabled
  }) => {
  return (
    <button
      disabled={disabled}
      type='button'
      onClick={onClick}
      className={cn('font-medium flex items-center justify-center rounded transition-all select-none', styles.button, styles[size], styles[color], classname)}>
      {icon && <img src={icon} alt='' />}
      {children}
    </button>
  )
}