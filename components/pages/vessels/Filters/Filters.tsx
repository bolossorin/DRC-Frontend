import React from "react";

interface IFilters {
  filters: { name: string, value: string }[]
  setFilters: (value: { name: string, value: string }[]) => void
}

export const Filters = ({ filters, setFilters }: IFilters) => {
  return (
    <div className='px-6 pb-6 pt-4'>
      {filters.length > 0 &&
        <div className='flex flex-wrap gap-4 items-center'>
          {filters.map((filter, index) =>
            <div key={index} className='bg-[#3C3C3C] px-3 py-[9px] rounded border border-[#A4A4A4] text-sm'>
              <span className='text-[#AAFF66]'>{filter.name}</span> : “{filter.value}“
            </div>)}
          <button
            type='button'
            onClick={() => setFilters([])}
            className='text-sm px-3 py-[9px] border border-[#A4A4A4] rounded hover:bg-[#3C3C3C] transition-all'>
            Clear Filters
          </button>
        </div>}
    </div>
  )
}