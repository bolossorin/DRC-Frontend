import { FC, useState } from "react";

// libs
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

// components
import { H5, H6 } from "../";
import { routes } from "@/utility/routes";
import {
  /*AdminIcon, ExperimentsIcon, HardwareIcon,*/ LogOutIcon,
  MobileLogoIcon,
  VesselIcon,
  BurgerIcon,
  HardwareIcon,
  ExperimentsIcon,
} from "../Icons";
import { SideBarDrawer } from "./SideBarDrawer";

// assets
import styles from "./SideBar.module.scss";
import { getUser } from "@/graphql/users/getUser";
import { IMyUser } from "@/graphql/types/user";
import { useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";

const links = [
  //{ icon: <AdminIcon />, title: 'Admin', link: '#' },
  { icon: <VesselIcon />, title: "Vessels", link: routes.vessels },
  { icon: <ExperimentsIcon />, title: "Experiments", link: routes.experiments },
  { icon: <HardwareIcon />, title: "Hardware", link: routes.hardware },
  { icon: <LogOutIcon />, title: "Log Out", link: "/api/auth/logout" },
];

export const SideBar: FC = () => {
  const { user }: any = useUser();
  const [openMenu, setOpenMenu] = useState(false);

  const { data } = useQuery<{ my_user: IMyUser }>(getUser, {
    fetchPolicy: "network-only",
  });

  const router = useRouter();

  if (!user) return <></>;

  return (
    <>
      <div className="block lg:hidden">
        <SideBarDrawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          links={links}
          user={user}
          jobTitle={data?.my_user.job_title || ""}
        />
      </div>
      <Placeholder />
      <div
        className={cn(
          "bg-[#282828] lg:w-80 w-16 fixed left-0 top-0 z-10 h-screen py-10 flex flex-col justify-between lg:justify-start",
          styles.sideBar
        )}
      >
        <Link href="/vessels" className="hidden lg:inline">
          <img className="w-[116px] mx-10 mb-2" src={"/logo.svg"} alt="" />
        </Link>
        <div className="block lg:hidden" onClick={() => setOpenMenu(true)}>
          <BurgerIcon />
        </div>
        {/* Previously, there was a link to the profile: <a href={routes.myProfile} className="mx-10 group hover:opacity-80 transition-all" > */}
        <div className="mx-10 my-10 text-center hidden lg:block">
          <div className="w-20 h-20 mb-6 rounded-full overflow-hidden mb-4 mx-auto relative">
            <img src={user.picture} alt="" className="object-cover" />
          </div>
          <H5 classname="font-medium flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#88E207] mr-3"></span>
            {user.name}
          </H5>
          <H6 classname="text-[#D9D9D9] font-medium">{data?.my_user.job_title || ""}</H6>
        </div>
        <ul className="pt-2 pb-12">
          {links.map((link) => (
            <li key={link.title} className={cn({ [styles.active]: router.asPath === link.link })}>
              <Link href={link.link} legacyBehavior>
                <a className={cn("flex items-center block lg:px-10 px-5 lg:py-5 py-4 transition-all")}>
                  <span className="w-6 lg:w-5 lg:mr-5">{link.icon}</span>
                  <span className="hidden lg:inline">{link.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/vessels" className="inline lg:hidden">
          <MobileLogoIcon />
        </Link>
      </div>
    </>
  );
};

/**
 * Invisible block taking up space under the menu.
 */
function Placeholder() {
  return <div className="shrink-0 lg:w-80 w-16" />;
}
