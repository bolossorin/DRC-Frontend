import React from "react";

// components
import { IFilter } from "../../../../utility/types";

interface IFilters {
  filters: IFilter[]
  setFilters: (value: IFilter[]) => void
}

export const Filters = ({ filters, setFilters }: IFilters) => {

  return (
    filters.length > 0 ?
      <div className='flex flex-wrap gap-4 items-center'>
        {filters.map((filter, index) =>
          <div key={index} className='flex bg-[#3C3C3C] px-3 rounded border border-[#A4A4A4] text-sm'>
            <div className='flex items-center'>
              <span className='py-[9px] text-[#AAFF66] mr-1'>{filter.name}</span> {filter.condition} “{filter.value}“
            </div>
            <div
              onClick={() => {
                const newFilters = [...filters.slice(0, index), ...filters.slice(index + 1)]
                setFilters([...newFilters])
              }}
              className='flex items-center py-[9px] pl-3 ml-3 border-l border-[#A4A4A4] cursor-pointer group transition-all'>
              <img className='w-2 opacity-50 group-hover:opacity-100' src={'/close.svg'} alt='' />
            </div>
          </div>)}
        <div className='border-l border-[#686868] pl-4'>
          <button
            type='button'
            onClick={() => setFilters([])}
            className='text-sm px-3 py-[9px] border border-[#A4A4A4] rounded hover:bg-[#3C3C3C] transition-all'>
            Clear Filters
          </button>
        </div>
      </div> : null
  )
}