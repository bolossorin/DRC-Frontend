import React from "react";

// components
import { Button } from "../../../common";

interface IActions {
  currentSelected: {}[]
  setIsStopModal: (value: boolean) => void
  setIsAddedModal: (value: boolean) => void
}

export const Actions = ({ currentSelected, setIsStopModal, setIsAddedModal }: IActions) => {
  return (
    <>
      <Button
        disabled={currentSelected.length <= 0}
        size='medium'
        classname='text-[#C0C0C0] w-full sm:w-auto'
        icon='/vs-code-white.svg' color='blue'>
        VS Code
      </Button>
      <Button
        onClick={() => setIsStopModal(true)}
        disabled={currentSelected.length <= 0}
        size='medium'
        classname='text-[#C0C0C0] w-full sm:w-auto'
        icon='/stop-empty.svg'
        color='red'>
        Stop
      </Button>
      <Button
        onClick={() => setIsAddedModal(true)}
        size='medium'
        classname='text-[#C0C0C0] w-full sm:w-auto'
        icon='/plus.svg'
        color='green'>
        Create
      </Button>
    </>
  )
}