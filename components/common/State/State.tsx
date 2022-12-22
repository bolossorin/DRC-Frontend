// libs
import cn from "classnames";

// assets
import styles from './State.module.scss'

interface IState {
  state: string
  fontSize?: string
}

export const State = ({ state, fontSize }: IState) => {
  return (
    <div
      className={cn(styles.state, 'flex items-center', styles[state.toLowerCase().replaceAll(' ', '_')])}>
      <span className={cn('min-w-[8px] w-2 h-2 mr-2 bg-amber-700 rounded-full', styles.icon)} />
      <span className={cn('overflow-hidden overflow-ellipsis', fontSize)}>{state}</span>
    </div>
  )
}