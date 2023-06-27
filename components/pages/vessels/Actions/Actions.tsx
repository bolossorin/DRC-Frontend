import React from "react";

import { SelectedElement } from "../Table/Table";
import { inactiveSessionStatuses } from "@/utility/inactiveSessionStatuses";

// components
import { Button } from "@/components/common";

interface IActions {
  currentSelected: SelectedElement[];
  vsCodeLink?: string | undefined;
  hideVsCode?: boolean;
  isStopping?: boolean;
  isCreating?: boolean;
  setIsStopModal: (value: boolean) => void;
  setIsCreateVessels?: (value: boolean) => void;
}

export const Actions = ({
  currentSelected,
  setIsStopModal,
  setIsCreateVessels,
  vsCodeLink,
  hideVsCode,
  isStopping,
  isCreating,
}: IActions) => {
  return (
    <>
      {!hideVsCode && (
        <Button
          disabled={currentSelected.length <= 0 || !vsCodeLink}
          size="medium"
          classname="w-full sm:w-auto"
          icon="/vscode-alt.svg"
          href={"https://staging.deeprender.dev/"}
          target="_blank"
          color="blue"
        >
          VS Code
        </Button>
      )}
      <Button
        onClick={() => setIsStopModal(true)}
        disabled={currentSelected.length <= 0 || !hasRunningVessels(currentSelected)}
        size="medium"
        classname="w-full sm:w-auto"
        icon="/stop-empty.svg"
        color="red"
        loading={isStopping}
      >
        Stop
      </Button>
      {setIsCreateVessels && (
        <Button
          onClick={() => setIsCreateVessels(true)}
          size="medium"
          classname="text-[#C0C0C0] w-full sm:w-auto"
          icon="/plus.svg"
          color="green"
          loading={isCreating}
        >
          Create
        </Button>
      )}
    </>
  );
};

function hasRunningVessels(selectedVessels: SelectedElement[]): boolean {
  for (const v of selectedVessels) {
    if (!inactiveSessionStatuses.includes(v.state)) return true;
  }
  return false;
}
