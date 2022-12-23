import React, { useEffect, useState } from "react";

// libs
import { Input, List } from "../../../common";
import { IFilter } from "../../../../utility/types";

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
  filters: { name: string, value: string, condition: string }[]
  setFilters: (value: IFilter[]) => void
  placeholder: string
}

export const Search = ({ setFilters, filters, placeholder }: ISearch) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [condition, setCondition] = useState<string>('');

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [searchValuesCondition, setSearchValuesCondition] = useState<{}[]>([]);

  useEffect(() => {
    setSearchValuesCondition([
      {
        value: '=',
        title: `<span class='text-[#AAFF66]'>${name}</span> =<div class='text-xs text-[#D9D9D9]'>Equals</div>`
      },
      {
        value: '!=',
        title: `<span class='text-[#AAFF66]'>${name}</span> !=<div class='text-xs text-[#D9D9D9]'>Does not equal</div>`
      },
      {
        value: ':',
        title: `<span class='text-[#AAFF66]'>${name}</span> :<div class='text-xs text-[#D9D9D9]'>Contains</div>`
      },
      {
        value: '!:',
        title: `<span class='text-[#AAFF66]'>${name}</span> !:<div class='text-xs text-[#D9D9D9]'>Does not contain</div>`
      },
    ])
  }, [name]);

  useEffect(() => {
    if (!searchValue.includes(name)) {
      setCurrentStep(1);
    } else if (!searchValue.includes(condition)) {
      setCurrentStep(2);
    }
  }, [searchValue])

  return (
    <div className='sm:max-w-[300px] w-full relative group'>
      <Input
        type='text'
        value={searchValue}
        setValue={setSearchValue}
        placeholder={placeholder}
        icon='/search.svg'
        onKeyPress={(event) => {
          // If the user presses the "Enter" key on the keyboard
          if (event.key === "Enter") {
            const newSearch = searchValue.split(condition)
            filters.push({ name: newSearch[0], condition: condition, value: newSearch[1] })
            setFilters([...filters]);
            setSearchValue('');
          }
        }} />
      {((searchValue.length <= 0 || !searchValue.includes(name)) && currentStep === 1) &&
        <List
          onClick={(target) => {
            setSearchValue(target);
            setName(target);
            setCurrentStep(2);
          }}
          size='small'
          title='Search Filters'
          list={searchValuesFilters}
          classname='group-hover:block !w-full left-0 top-auto bottom-0 translate-y-full' />}
      {currentStep === 2 &&
        <List
          onClick={(target) => {
            setCurrentStep(0);
            setCondition(target)
            setSearchValue(`${name}${target}`)
          }}
          size='small'
          condition={`Use: “${searchValue}”`}
          title='Operators'
          list={searchValuesCondition}
          classname='!block !w-full left-0 top-auto bottom-0 translate-y-full' />}
    </div>
  )
}