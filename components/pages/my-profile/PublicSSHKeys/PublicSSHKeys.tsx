import React from "react";

// components
import { Button, H4 } from "../../../common";

// assets
import styles from './PublicSSHKeys.module.scss';

const keys = [
  {
    label: 'Macbook Pro',
    type: 'ssh-ed25519',
    key: 'AAAAC3NzaC1lZDI1NTE5AAAAIBQl0CK++aHRx+RAZetnIVPMPJzrpHLwFg1pa1HG2',
    email: 'alex.lytchier@deeprender.ai'
  },
  {
    label: 'Macbook Pro',
    type: 'ssh-ed25519',
    key: 'AAAAC3NzaC1lZDI1NTE5AAAAIBQl0CK++aHRx+RAZetnIVPMPJzrpHLwFg1pa1HG2',
    email: 'alex.lytchier@deeprender.ai'
  },
  {
    label: 'Macbook Pro',
    type: 'ssh-ed25519',
    key: 'AAAAC3NzaC1lZDI1NTE5AAAAIBQl0CK++aHRx+RAZetnIVPMPJzrpHLwFg1pa1HG2',
    email: 'alex.lytchier@deeprender.ai'
  },
]
export const PublicSSHKeys = () => {
  return (
    <div className='py-6 px-3 sm:p-6 bg-[#2F2F2F] rounded'>
      <H4 classname='!mb-8 flex !text-xl flex-wrap items-center'>
        <img className='w-5 mr-4' src={'/link.svg'} alt='' />
        Public SSH Keys
        <Button icon='/plus.svg' classname='ml-auto w-full sm:w-auto mt-4 sm:mt-0' size='medium' color='green'>
          Add Key
        </Button>
      </H4>
      <div className='flex flex-wrap justify-between gap-y-6'>
        {keys.map((key, index) => (
          <div key={index} className='relative border border-[#686868] rounded-[5px] p-3 sm:p-6 w-full xl:w-[49%]'>
            <div className='absolute right-3 md:right-6 top-3 md:top-6 flex items-center gap-1'>
              <img src={'./edit.svg'} className='w-3.5 ml-2 cursor-pointer transition-all hover:opacity-70' alt='' />
              <img src={'./close.svg'} className='w-3.5 ml-2 cursor-pointer transition-all hover:opacity-70' alt='' />
            </div>
            <ul className={styles.list}>
              <li><span>Label:</span>{key.label}</li>
              <li><span>Type:</span>{key.type}</li>
              <li><span>Key:</span>{key.key}</li>
              <li><span>Email:</span>{key.email}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}