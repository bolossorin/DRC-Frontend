// components
import { H5 } from "../../H5/H5";

interface IModalLayout {
  children: any
  icon: string
  title: string
  setIsOpen: (value: boolean) => void
}

export const ModalLayout = ({ children, icon, setIsOpen, title }: IModalLayout) => {
  return (
    <div className='fixed z-50 left-0 top-0 w-full h-full flex items-center justify-center'>
      <div onClick={() => setIsOpen(false)} className='bg-black/40 absolute left-0 top-0 z-10 w-full h-full' />
      <div className='w-[95%] relative z-20 max-w-[500px] bg-[#3C3C3C] border border-[#686868] rounded'>
        <div className='py-4 px-3 md:px-6 flex items-center border-b border-[#686868]'>
          <img className='w-8 mr-4' src={icon} alt='' />
          <H5 classname='text-white !mb-0 text-lg'>{title}</H5>
          <img
            onClick={() => setIsOpen(false)}
            className='w-4 ml-auto opacity-50 hover:opacity-100 cursor-pointer'
            src='/close.svg' alt='' />
        </div>
        <div className='py-4 md:py-10 px-3 md:px-6'>
          {children}
        </div>
      </div>
    </div>
  )
}