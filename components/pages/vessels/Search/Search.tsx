import React from "react";

// libs
import Select, { components, ControlProps, MenuListProps, StylesConfig } from "react-select";

const searchValues: ({ label: string; value: string })[] = [
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

const Control = ({ children, ...props }: ControlProps) => {
  return (
    <components.Control {...props}>
      <img className='w-4' src='/search.svg' alt='' />
      {children}
    </components.Control>
  );
};

const MenuList = (props: MenuListProps) => {
  const menuHeaderStyle = {
    padding: '11px 16px',
    background: '#3C3C3C',
    borderBottom: '1px solid #A4A4A4',
    fontWeight: 'bold'
  };

  return (
    <components.MenuList {...props}>
      <div style={menuHeaderStyle}>Search Filters</div>
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

export const Search = () => {
  return (
    <Select
      styles={styles}
      controlShouldRenderValue={true}
      components={{ Control, MenuList, DropdownIndicator }}
      className="basic-single search"
      classNamePrefix="select"
      maxMenuHeight={500}
      name="color"
      options={searchValues}
      placeholder='Search for vessels by attribute...'
    />
  )
}