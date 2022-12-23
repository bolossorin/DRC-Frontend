// components
import { ModalLayout } from "../ModalLayout/ModalLayout";
import { Paragraph } from "../../Paragraph/Paragraph";
import { Button } from "../../Button/Button";

interface IVesselAddedModal {
  setIsOpen: (value: boolean) => void
}

export const VesselAddedModal = ({ setIsOpen }: IVesselAddedModal) => {
  return (
    <ModalLayout
      title='Vessel Added'
      icon='/checkbox-green.svg'
      setIsOpen={setIsOpen}>
      <div className='text-center'>
        <Paragraph classname='!text-base text-[#D9D9D9]'>5 vessels have been added</Paragraph>
        <Button
          onClick={() => setIsOpen(false)}
          size='small'
          classname='mx-auto mt-8'
          color='green'>
          OK
        </Button>
      </div>
    </ModalLayout>
  )
}