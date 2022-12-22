import React, { useState } from "react";

// libs
import Select, { components, ControlProps, StylesConfig } from "react-select";

const searchValuesFilters: ({ label: string; value: string })[] = [
  { value: 'Vessel ID', label: 'Vessel ID' },
  { value: 'Name', label: 'Name' },
  { value: 'State', label: 'State' },
  { value: 'Queue', label: 'Queue' },
  { value: 'Docker Image', label: 'Docker Image' },
  { value: 'GPUs', label: 'GPUs' },
  { value: 'GPU Utilisation', label: 'GPU Utilisation' },
  { value: 'GPU Memory', label: 'GPU Memory' },
  { value: 'Created At', label: 'Created At' },
];

const searchValuesCondition: ({ label: string; value: string })[] = [
  { value: '=', label: 'Equals' },
  { value: '!=', label: 'Does not equal' },
  { value: ':', label: 'Contains' },
  { value: '!:', label: 'Does not contain' },
];

const Control = ({ children, ...props }: ControlProps) => {
  return (
    <components.Control
      {...props}>
      {/*@ts-ignore*/}
      <div className='flex itemd-center' onClick={props.selectProps.handleOpenMenu}>
        <img className='w-4' src='/search.svg' alt='' />
        {children}
      </div>
    </components.Control>
  );
};

const MenuList = (props: any) => {

  const style1 = {
    padding: '11px 16px',
    background: '#3C3C3C',
    borderBottom: '1px solid #A4A4A4',
    fontWeight: 'bold'
  };

  const style2 = {
    padding: '11px 16px',
    background: '#535353',
    borderBottom: '1px solid #A4A4A4',
  };

  return (
    <components.MenuList {...props}>
      {props.getValue()[0] && props.getValue()[0].label ?
        <>
          <div style={style2}>Use: “{props.getValue()[0].label}”</div>
          <div style={style1}>Operators</div>
        </>
        : <div style={style1}>Search Filters</div>}
      {props.children}
    </components.MenuList>
  );
};

const DropdownIndicator = () => {
  return null;
};

const styles: StylesConfig = {
  control: (css: any) => ({ ...css, paddingLeft: '1rem' }),
  option: (css: any) => ({ ...css, padding: '11px 12px 11px 48px' }),
};

const Option = (props: any) => {
  return (
    props.getValue()[0] && props.getValue()[0].label
      ? <div
        onClick={props.selectProps.handleCloseMenu}
        className='select__option'
        style={{ padding: '11px 12px 11px 48px' }}>
        <div className='text-[#AAFF66]'>
          {props.getValue()[0].label} <span className='text-[#D9D9D9]'>{props.value}</span>
        </div>
        <div className='text-xs text-[#D9D9D9]'>
          {props.children}
        </div>
      </div>
      : <components.Option {...props}>
        {props.children}
      </components.Option>
  );
};

interface ISearch {
  filters: { name: string, value: string }[]
  setFilters: (value: { name: string, value: string }[]) => void
}

export const Search = ({ setFilters, filters }: ISearch) => {
  const [value, setValue] = useState<any>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
  }

  const handleCloseMenu = () => {
    setValue("");
    setIsOpen(false);
  }

  return (
    <div className='sm:max-w-[300px] w-full'>
      <Select
        styles={styles}
        menuIsOpen={isOpen}
        onBlur={handleCloseMenu}
        components={{ Control, Option, MenuList, DropdownIndicator }}
        className="basic-single search"
        classNamePrefix="select"
        maxMenuHeight={500}
        name="color"
        options={value ? searchValuesCondition : searchValuesFilters}
        placeholder='Search for vessels by attribute...'
        value={value}
        onChange={setValue}
        closeMenuOnSelect={false}
        // @ts-ignore
        handleOpenMenu={handleOpenMenu}
        handleCloseMenu={() => {
          filters.push({ name: value.label, value: value.label })
          setFilters([...filters])
          handleCloseMenu()
        }}
      />
    </div>
  )
}