import React, { useEffect, useState } from "react";

// libs
import { Input, List } from "../../../common";

const searchValuesFilters: ({ title: string; value: string })[] = [
  { value: 'Vessel ID', title: 'Vessel ID' },
  { value: 'Name', title: 'Name' },
  { value: 'State', title: 'State' },
  { value: 'Queue', title: 'Queue' },
  { value: 'Docker Image', title: 'Docker Image' },
  { value: 'GPUs', title: 'GPUs' },
  { value: 'GPU Utilisation', title: 'GPU Utilisation' },
  { value: 'GPU Memory', title: 'GPU Memory' },
  { value: 'Created At', title: 'Created At' },
];

interface ISearch {
  filters: { name: string, value: string }[]
  setFilters: (value: { name: string, value: string }[]) => void
}

export const Search = ({ setFilters, filters }: ISearch) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [searchValuesCondition, setSearchValuesCondition] = useState<{}[]>([]);

  useEffect(() => {
    setSearchValuesCondition([
      {
        value: '=',
        title: `<span class='text-[#AAFF66]'>${searchValue}</span> =<div class='text-xs text-[#D9D9D9]'>Equals</div>`
      },
      {
        value: '!=',
        title: `<span class='text-[#AAFF66]'>${searchValue}</span> !=<div class='text-xs text-[#D9D9D9]'>Does not equal</div>`
      },
      {
        value: ':',
        title: `<span class='text-[#AAFF66]'>${searchValue}</span> :<div class='text-xs text-[#D9D9D9]'>Contains</div>`
      },
      {
        value: '!:',
        title: `<span class='text-[#AAFF66]'>${searchValue}</span> !:<div class='text-xs text-[#D9D9D9]'>Does not contain</div>`
      },
    ])
  }, [searchValue]);

  return (
    <div className='sm:max-w-[300px] w-full relative'>
      <Input
        onFocus={() => setCurrentStep(1)}
        type='text'
        value={searchValue}
        setValue={setSearchValue}
        placeholder='Search for vessels by attribute...'
        icon='/search.svg' />
      {searchValue.length > 0 && currentStep === 1 &&
        <List
          onClick={(name) => {
            setName(name)
            setCurrentStep(2);
          }}
          size='small'
          title='Search Filters'
          list={searchValuesFilters}
          classname='!block !w-full left-0 top-12' />}
      {currentStep === 2 &&
        <List
          onClick={() => {
            filters.push({ name: name, value: searchValue })
            setFilters([...filters])
            setCurrentStep(0);
            setSearchValue('')
          }}
          size='small'
          condition={`Use: “${searchValue}”`}
          title='Operators'
          list={searchValuesCondition}
          classname='!block !w-full left-0 top-12' />}
    </div>
  )
}