// libs
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

// components
import { H5, H6 } from "../";
import { routes } from "../../../utility/routes";


const links = [
  { icon: '/admin.svg', title: 'Admin', link: '#' },
  { icon: '/vessel.svg', title: 'Vessels', link: routes.vessels },
  { icon: '/experiments.svg', title: 'Experiments', link: '#' },
  { icon: '/hardware.svg', title: 'Hardware', link: '#' },
  { icon: '/log-out.svg', title: 'Log Out', link: '#' },
]
export const SideBar = () => {
  const router = useRouter();

  return (
    <div className='bg-[#282828] w-80 fixed left-0 top-0 z-10 h-screen py-10'>
      <img className='w-[116px] mx-10 mb-10' src={'/logo.svg'} alt='' />
      <div className='mx-10 text-center'>
        <div className='w-20 mb-6 rounded-full mb-4 mx-auto'>
          <img src={'/images/avatar.png'} alt='' />
        </div>
        <H5 classname='font-medium'>Alexander Lytchier</H5>
        <H6 classname='text-[#D9D9D9] font-medium'>VP of Engineering</H6>
      </div>
      <ul className='py-12'>
        {links.map(link => (
          <li key={link.title}>
            <Link href={link.link} legacyBehavior>
              <a
                className={cn('flex items-center block px-10 py-4 hover:bg-[#3C3C3C] transition-all', { 'bg-[#3C3C3C]': router.asPath === link.link })}>
                <img className='w-5 mr-5' src={link.icon} alt='' />
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}