// libs
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

// components
import { H5, H6 } from "../";
import { routes } from "../../../utility/routes";
import { AdminIcon, ExperimentsIcon, HardwareIcon, LogOutIcon, VesselIcon } from "../Icons";

// assets
import styles from './SideBar.module.scss';

const links = [
  { icon: <AdminIcon />, title: 'Admin', link: '#' },
  { icon: <VesselIcon />, title: 'Vessels', link: routes.vessels },
  { icon: <ExperimentsIcon />, title: 'Experiments', link: '#' },
  { icon: <HardwareIcon />, title: 'Hardware', link: routes.hardware },
  { icon: <LogOutIcon />, title: 'Log Out', link: '#' },
]
export const SideBar = () => {
  const router = useRouter();

  return (
    <div className={cn('bg-[#282828] w-80 fixed left-0 top-0 z-10 h-screen py-10', styles.sideBar)}>
      <img className='w-[116px] mx-10 mb-10' src={'/logo.svg'} alt='' />
      <a href={routes.myProfile} className='mx-10 text-center group hover:opacity-80 transition-all'>
        <div className='w-20 mb-6 rounded-full mb-4 mx-auto'>
          <img src={'/images/avatar.png'} alt='' />
        </div>
        <H5 classname='font-medium flex items-center justify-center'>
          <span className='w-2 h-2 rounded-full bg-[#88E207] mr-3'></span>
          Alexander Lytchier
        </H5>
        <H6 classname='text-[#D9D9D9] font-medium'>VP of Engineering</H6>
      </a>
      <ul className='py-12'>
        {links.map(link => (
          <li key={link.title} className={cn({ [styles.active]: router.asPath === link.link })}>
            <Link href={link.link} legacyBehavior>
              <a
                className={cn('flex items-center block px-10 py-4 transition-all')}>
              <span className='w-5 mr-5'>
                {link.icon}
              </span>
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}