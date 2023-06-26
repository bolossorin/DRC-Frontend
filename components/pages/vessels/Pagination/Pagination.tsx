import React from "react";

interface IProps {
  totalCount: number;
  limit: number;
  offset: number;
  onPageChange: (offset: number) => void;
}

export const Pagination = ({ totalCount, limit, offset, onPageChange }: IProps) => {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div className="font-medium mr-1 md:mr-5">{`${totalCount > 0 ? offset + 1 : 0} – ${
        offset + limit < totalCount ? offset + limit : totalCount
      } of ${totalCount}`}</div>
      <div className="flex items-center gap-[18px]">
        <button
          className="flex justify-center items-center w-6 h-6 cursor-pointer transition-all opacity-50 hover:opacity-100 hover:bg-[#3C3C3C] rounded-sm"
          disabled={offset - limit < 0}
          onClick={() => onPageChange(offset - limit)}
        >
          <img src="/arrow.svg" alt="" className="w-2.5" />
        </button>
        <button
          className="flex justify-center items-center w-6 h-6 cursor-pointer transition-all opacity-50 hover:opacity-100 rotate-180 hover:bg-[#3C3C3C] rounded-sm"
          disabled={offset + limit >= totalCount}
          onClick={() => onPageChange(offset + limit)}
        >
          <img src="/arrow.svg" alt="" className="w-2.5" />
        </button>
      </div>
    </div>
  );
};
