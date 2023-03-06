import React, { ChangeEvent } from "react";

interface ISwitch {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({ checked, onChange }: ISwitch) => {
  return (
    <label className="relative flex hover:opacity-70 transition-all">
      <input className="peer" type="checkbox" checked={checked} onChange={onChange} hidden />
      <div className="rounded cursor-pointer w-12 h-6 bg-[#686868] peer-checked:bg-[#47A000] transition-all" />
      <span className="pointer-events-none absolute z-10 top-1/2 left-1 -translate-y-1/2 block w-4 h-4 bg-[#F6F6F6] rounded-[3px] peer-checked:left-7 transition-all" />
    </label>
  );
};
