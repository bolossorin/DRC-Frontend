import React, { FC } from "react";

// libs
import cn from "classnames";

interface ICelHeader {
  children: any;
  classname?: string;
  isSort?: boolean;
}

export const CelHeader: FC<ICelHeader> = ({ children, classname, isSort }) => {
  return (
    <th
      className={cn(
        "px-2 py-4 text-sm text-[#D9D9D9] overflow-hidden text-ellipsis text-white font-bold cell group select-none cursor-pointer w-20 md:w-20",
        classname
      )}
      align="left"
    >
      <div className="flex items-center text-base leading-4">
        {children}
        {isSort && (
          <img className="ml-2 w-2.5 opacity-50 group-hover:opacity-100 transition-all" src="/sort-arrow.svg" alt="" />
        )}
      </div>
    </th>
  );
};
