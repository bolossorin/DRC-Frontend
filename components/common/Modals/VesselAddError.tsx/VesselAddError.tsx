// components
import { ModalLayout } from "../ModalLayout/ModalLayout";
import { Paragraph } from "../../Paragraph/Paragraph";
import { Button } from "../../Button/Button";

interface IVesselAddError {
  setIsOpen: (value: boolean) => void;
  message: string;
}

export const VesselAddError = ({ setIsOpen, message }: IVesselAddError) => {
  return (
    <ModalLayout title="Vessel Adding Error" icon="/cube.svg" setIsOpen={setIsOpen}>
      <div className="text-center">
        <Paragraph classname="!text-base text-[#D9D9D9]">{message}</Paragraph>
        <Button
          onClick={() => {
            setIsOpen(false);
          }}
          size="small"
          classname="mx-auto mt-8"
          color="red"
        >
          OK
        </Button>
      </div>
    </ModalLayout>
  );
};
