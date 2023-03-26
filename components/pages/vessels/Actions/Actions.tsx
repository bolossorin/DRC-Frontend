import React from "react";

// components
import { Button } from "@/components/common";

interface IActions {
  currentSelected: string[];
  setIsStopModal: (value: boolean) => void;
  setIsCreateVessels: (value: boolean) => void;
  vsCodeLink: string | undefined;
}

export const Actions = ({ currentSelected, setIsStopModal, setIsCreateVessels, vsCodeLink }: IActions) => {
  return (
    <>
      <Button
        disabled={currentSelected.length <= 0 || !vsCodeLink}
        size="medium"
        classname="w-full sm:w-auto"
        icon="/vs-code-white.svg"
        href={"https://" + vsCodeLink}
        target="_blank"
        color="blue"
      >
        VS Code
      </Button>
      <Button
        onClick={() => setIsStopModal(true)}
        disabled={currentSelected.length <= 0}
        size="medium"
        classname="w-full sm:w-auto"
        icon="/stop-empty.svg"
        color="red"
      >
        Stop
      </Button>
      <Button
        onClick={() => setIsCreateVessels(true)}
        size="medium"
        classname="text-[#C0C0C0] w-full sm:w-auto"
        icon="/plus.svg"
        color="green"
      >
        Create
      </Button>
    </>
  );
};
