import React, { useRef, useState } from "react";

// components
import { H6 } from "../H6/H6";

interface ICode {
  children: any
  title: string
}

export const Code = ({ children, title }: ICode) => {
  let textFef: any = useRef(null);
  const [copiedText, setCopiedText] = useState('Click to copy');

  return (
    <div>
      <H6>{title}</H6>
      <div className='flex justify-between border border-[#686868] rounded'>
        <div
          ref={textFef}
          className='px-6 text-sm text-[#D9D9D9] py-4 overflow-hidden text-ellipsis whitespace-nowrap leading-[2]'>
          {children}
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(textFef.current.innerText);
            setCopiedText('Copied');
            setTimeout(() => {
              setCopiedText('Click to copy');
            }, 500)
          }}
          className='flex items-center justify-center border-l border-[#686868] px-6 py-4 transition-all cursor-pointer group'>
          <div className='relative'>
            <img className='w-4 min-w-[16px] select-none' src={'/copy.svg'} alt='' />
            <span
              className='hidden group-hover:block absolute left-0 top-0 -translate-y-full text-sm p-2 bg-[#686868] whitespace-nowrap rounded select-none pointer-events-none'>
              {copiedText}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}