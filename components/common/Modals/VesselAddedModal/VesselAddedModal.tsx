// components
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { Paragraph } from '../../Paragraph/Paragraph';
import { Button } from '../../Button/Button';

interface IVesselAddedModal {
  setIsOpen: (value: boolean) => void;
  setCountVessels: (value: number) => void;
  countVessels: number;
}

export const VesselAddedModal = ({ setIsOpen, countVessels, setCountVessels }: IVesselAddedModal) => {
  return (
    <ModalLayout title="Vessel Added" icon="/checkbox-green.svg" setIsOpen={setIsOpen}>
      <div className="text-center">
        <Paragraph classname="!text-base text-[#D9D9D9]">{countVessels} vessels have been added</Paragraph>
        <Button
          onClick={() => {
            setIsOpen(false);
            setCountVessels(1);
          }}
          size="small"
          classname="mx-auto mt-8"
          color="green">
          OK
        </Button>
      </div>
    </ModalLayout>
  );
};
