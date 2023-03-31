// libs
import cn from "classnames";

// components
import { H5 } from "@/components/common";

// assets
import styles from './Overall.module.scss';

const overall = { total: 92, free: 34, used: 41, live: 75, dead: 8 };
export const Overall = () => {
  return (
    <div className='border text-center border-[#414040] rounded-lg mb-6'>
      <div className='p-3 border-b border-[#414040]'>
        <H5 classname='!mb-0 !font-medium'>Overall</H5>
      </div>
      <ul className={cn('px-2 md:px-12 py-4 flex items-center justify-between', styles.overall)}>
        <li><span>{overall.total}</span>Total</li>
        <li><span>{overall.free}</span>Free</li>
        <li><span>{overall.used}</span>Used</li>
        <li><span>{overall.live}</span>Live</li>
        <li><span>{overall.dead}</span>Dead</li>
      </ul>
    </div>
  )
}