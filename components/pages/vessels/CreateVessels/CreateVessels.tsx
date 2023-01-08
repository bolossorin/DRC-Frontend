import { useState } from "react";

// libs
import cn from "classnames";
import Select from "react-select";

//  components
import { Button, DropdownIndicator, H4, Input, Paragraph, PlusMinusInput, Radio } from "../../../common";

interface ICreateVessels {
  setIsOpen: (value: boolean) => void
  setIsAddedModal: (value: boolean) => void
  setCountVessels: (value: number) => void
  countVessels: number
}

const queues: ({ label: string; value: string })[] = [
  { value: 'Queue1', label: 'Queue1' },
  { value: 'Queue2', label: 'Queue2' },
  { value: 'Queue3', label: 'Queue3' },
];

const dockerImages: ({ label: string; value: string })[] = [
  { value: 'Image1', label: 'Image1' },
  { value: 'Image2', label: 'Image2' },
  { value: 'Image4', label: 'Image3' },
];

export const CreateVessels = ({ setIsOpen, setIsAddedModal, setCountVessels, countVessels }: ICreateVessels) => {
  const [countGPUs, setCountGPUs] = useState(0);
  const [isShowAdvanced, setIsShowAdvanced] = useState(false);

  return (
    <div className='fixed z-50 left-0 top-0 h-full w-full'>
      <div onClick={() => setIsOpen(false)} className='bg-black/40 absolute left-0 top-0 z-10 w-full h-full' />
      <div className='w-full h-full relative z-20 ml-auto max-w-[478px] bg-[#282828] overflow-auto'>
        <div className='py-7 px-5 md:px-10 flex items-center border-b border-[#686868]'>
          <img className='w-8 mr-3 md:mr-7' src='/cube-green.svg' alt='' />
          <H4 classname='!mb-0'>Create Vessels</H4>
          <img
            onClick={() => setIsOpen(false)}
            className='w-4 ml-auto opacity-50 hover:opacity-100 cursor-pointer'
            src='/close.svg' alt='' />
        </div>
        <div className='py-4 md:py-9 px-5 md:px-10'>
          <div className='mb-4'>
            <H4>1. Name & Quantity</H4>
            <div className='flex items-center gap-3 md:gap-6 my-8'>
              <Paragraph classname='!mb-0'>Number of Vessels</Paragraph>
              <PlusMinusInput value={countVessels} setValue={setCountVessels} />
            </div>
            {Array.from(Array(countVessels).keys()).map((index) =>
              <Input key={index} classname='mb-6' type='text' placeholder='Vessel Name' />
            )}
          </div>
          <div className='mb-9'>
            <H4>2. GPU</H4>
            <div className='flex items-center gap-3 md:gap-6 my-8'>
              <Paragraph classname='!mb-0'>Number of GPUs</Paragraph>
              <PlusMinusInput value={countGPUs} setValue={setCountGPUs} />
            </div>
            {Array.from(Array(countGPUs).keys()).map((index) =>
              <div key={index} className='flex items-center gap-4 mb-6'>
                <Paragraph classname='!mb-0'>Queue</Paragraph>
                <Select
                  className="basic-single light w-full"
                  classNamePrefix="select"
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  options={queues} />
              </div>
            )}
          </div>
          <div className='mb-10'>
            <H4>3. Docker</H4>
            <div className='flex items-center gap-3 md:gap-6 my-8'>
              <Paragraph classname='!mb-0'>Image</Paragraph>
              <Select
                className="basic-single light w-full"
                classNamePrefix="select"
                components={{ DropdownIndicator }}
                placeholder='Select'
                options={dockerImages} />
            </div>
          </div>
          <div className='mb-4'>
            <H4
              onClick={() => setIsShowAdvanced(!isShowAdvanced)}
              classname='flex items-center cursor-pointer transition-all hover:opacity-70 select-none'>
              4. Advanced
              <img
                className={cn('w-2.5 ml-4 -rotate-90 transition-all', { '!rotate-90': isShowAdvanced })}
                src={'/arrow.svg'}
                alt='' />
            </H4>
            {isShowAdvanced && <div className='flex items-center gap-3 md:gap-6 mt-6 mb-9'>
              <Paragraph classname='!mb-0 md:mr-4'>Priveleged Access</Paragraph>
              <Radio name='access' label='True' checked={true} />
              <Radio name='access' label='False' />
            </div>}
          </div>
          <Button size='medium' color='green' onClick={() => {
            setIsOpen(false);
            setIsAddedModal(true);
          }}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}