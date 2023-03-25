import { FC, useEffect } from "react";

// libs
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

// components
import { H5, H6 } from "../";
import { routes } from "@/utility/routes";
import { /*AdminIcon, ExperimentsIcon, HardwareIcon,*/ LogOutIcon, VesselIcon } from "../Icons";
import { IUser } from "@/utility/types";

// assets
import styles from './SideBar.module.scss';
import { getUser } from "@/graphql/users/getUser";
import { IMyUser } from "@/graphql/types/user";
import { useQuery } from "@apollo/client";

const links = [
  //{ icon: <AdminIcon />, title: 'Admin', link: '#' },
  { icon: <VesselIcon />, title: 'Vessels', link: routes.vessels },
  //{ icon: <ExperimentsIcon />, title: 'Experiments', link: '#' },
  //{ icon: <HardwareIcon />, title: 'Hardware', link: routes.hardware },
  { icon: <LogOutIcon />, title: 'Log Out', link: '/api/auth/logout' },
]

interface ISideBar {
  user: IUser
}

export const SideBar: FC<ISideBar> = ({ user }) => {
  const { data, refetch, subscribeToMore } = useQuery<{ my_user: IMyUser }>(getUser, {
    fetchPolicy: "network-only",
  });

  const router = useRouter();

  return (
    <div className={cn('bg-[#282828] w-80 fixed left-0 top-0 z-10 h-screen py-10', styles.sideBar)}>
      <Link href="/vessels">
        <img className='w-[116px] mx-10 mb-2' src={'/logo.svg'} alt='' />
      </Link>
      <a href={routes.myProfile} className='mx-10 text-center group hover:opacity-80 transition-all'>
        <div className='w-20 mb-6 rounded-full overflow-hidden mb-4 mx-auto'>
          <img src={user.picture} alt='' />
        </div>
        <H5 classname='font-medium flex items-center justify-center'>
          <span className='w-2 h-2 rounded-full bg-[#88E207] mr-3'></span>
          {user.name}
        </H5>
        <H6 classname='text-[#D9D9D9] font-medium'>{data?.my_user.job_title || "..."}</H6>
      </a>
      <ul className='pt-2 pb-12'>
        {links.map(link => (
          <li key={link.title} className={cn({ [styles.active]: router.asPath === link.link })}>
            <Link href={link.link} legacyBehavior>
              <a
                className={cn('flex items-center block px-10 py-5 transition-all')}>
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