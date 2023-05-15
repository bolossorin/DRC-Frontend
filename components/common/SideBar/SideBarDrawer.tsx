// libs
import React from "react";
import cn from "classnames";
import { useRouter } from "next/router";

// components
import Link from "next/link";
import { H5 } from "../H5/H5";
import { H6 } from "../H6/H6";
import { CloseIcon } from "../Icons";

// assets
import styles from "./SideBarDrawer.module.scss";
import sideBarStyles from "./SideBar.module.scss";

interface Props {
  open: boolean;
  className?: string;
  onClose: () => void;
  links: { title: string; icon: React.ReactNode; link: string }[];
  user: {
    picture: string;
    name: string;
  };
  jobTitle: string;
}

export const SideBarDrawer = ({ open, onClose, className, links, user, jobTitle }: Props) => {
  const router = useRouter();

  return (
    <>
      <div
        className={cn(styles.overlay, open ? styles.overlayOpen : styles.overlayHidden)}
        onClick={onClose}
        aria-hidden='true'
      />
      <div tabIndex={-1} className={cn(styles.drawer, open ? styles.animate : styles.hidden, styles.left, className)}>
        <div
          className={cn(
            "bg-[#282828] w-60 h-screen pb-10 pt-[120px] relative flex flex-col justify-between",
            sideBarStyles.sideBar
          )}
        >
          <div className='absolute top-10 left-10' onClick={onClose}>
            <CloseIcon />
          </div>
          <div>
            <div className='mx-10 my-10 text-center'>
              <div className='w-20 h-20 mb-6 rounded-full overflow-hidden mb-4 mx-auto relative'>
                <img src={user.picture} alt='' className='object-cover' />
              </div>
              <H5 classname='font-medium flex items-center justify-center'>
                <span className='w-2 h-2 rounded-full bg-[#88E207] mr-3'></span>
                {user.name}
              </H5>
              <H6 classname='text-[#D9D9D9] font-medium'>{jobTitle}</H6>
            </div>
            <ul className='pt-2 pb-12'>
              {links.map((link) => (
                <li key={link.title} className={cn({ [sideBarStyles.active]: router.asPath === link.link })}>
                  <Link href={link.link} legacyBehavior>
                    <a className={cn("flex items-center block px-10 py-4 transition-all")}>
                      <span className='w-6 mr-5'>{link.icon}</span>
                      {link.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href='/vessels' className='self-center'>
            <img className='w-[116px] mx-10 mb-2' src={"/logo.svg"} alt='' />
          </Link>
        </div>
      </div>
    </>
  );
};
