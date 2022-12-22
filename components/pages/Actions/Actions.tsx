import React from "react";

// components
import { Button } from "../../common";

interface IActions {
  currentSelected: {}[]
}

export const Actions = ({ currentSelected }: IActions) => {
  return (
    <>
      <Button
        disabled={currentSelected.length <= 0}
        size='small'
        classname='text-[#C0C0C0] w-full sm:w-auto'
        icon='/vs-code-white.svg' color='blue'>
        VS Code
      </Button>
      <Button
        disabled={currentSelected.length <= 0}
        size='small'
        classname='text-[#C0C0C0] w-full sm:w-auto'
        icon='/stop-empty.svg'
        color='red'>
        Stop
      </Button>
      <Button
        size='small'
        classname='text-[#C0C0C0]
                     w-full sm:w-auto'
        icon='/plus.svg'
        color='green'>
        Create
      </Button>
    </>
  )
}