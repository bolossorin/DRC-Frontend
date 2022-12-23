// components
import { ModalLayout } from "../ModalLayout/ModalLayout";
import { Paragraph } from "../../Paragraph/Paragraph";
import { Button } from "../../Button/Button";

const vessels = ['“Super Super Long Vessel Name!!”', '“Super Super Long Vessel Name!!”', '“Super Super Long Vessel Name!!”', '“Super Super Long Vessel Name!!”']

interface IStopVesselsModal {
  setIsOpen: (value: boolean) => void
}

export const StopVesselsModal = ({ setIsOpen }: IStopVesselsModal) => {
  return (
    <ModalLayout title='Stop Vessels' icon='/stop.svg' setIsOpen={setIsOpen}>
      <div className='text-center'>
        <Paragraph>Are you sure you want to stop vessels</Paragraph>
        <ul className='list-disc max-w-[206px] mx-auto text-left'>
          {vessels.map((vessel, index) =>
            <li className='text-xs text-[#D9D9D9] mb-2' key={index}>
              {vessel}
            </li>)}
        </ul>
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6'>
          <Button
            onClick={() => setIsOpen(false)}
            size='small'
            color='lightGrey'>
            Cancel
          </Button>
          <Button size='small' color='red'>Stop</Button>
        </div>
      </div>
    </ModalLayout>
  )
}