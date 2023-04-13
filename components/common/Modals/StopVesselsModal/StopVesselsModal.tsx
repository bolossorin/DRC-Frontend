import React from "react";

// libs
import Link from "next/link";

// components
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { Paragraph } from '@/components/common';
import { Button } from '../../Button/Button';
import { routes } from "@/utility/routes";
import { inactiveSessionStatuses } from '@/utility/inactiveSessionStatuses';
import { SelectedVessel } from '@/components/pages/vessels/Table/Table';

interface IStopVesselsModal {
  vessels: SelectedVessel[];
  setIsOpen: (value: boolean) => void;
  onStop: () => void;
}

export const StopVesselsModal = ({ setIsOpen, vessels, onStop }: IStopVesselsModal) => {
  return (
    <ModalLayout title="Stop Vessels" icon="/stop.svg" setIsOpen={setIsOpen}>
      <div className="text-center">
        <Paragraph>Are you sure you want to stop vessels</Paragraph>
        <ul className="list-disc max-w-[206px] mx-auto text-left">
          {vessels.filter(v => !inactiveSessionStatuses.includes(v.state)).map((vessel, index) => (
            <li className="text-xs text-[#D9D9D9] mb-2" key={index}>
              <Link href={`${routes.vessels}/${vessel.id}`} legacyBehavior>
                <a target="_blank" className="underline hover:no-underline">
                  {vessel.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6">
          <Button onClick={() => setIsOpen(false)} size="small" color="lightGrey">
            Cancel
          </Button>
          <Button size="small" color="red" onClick={onStop}>
            Stop
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};
