import { components, DropdownIndicatorProps } from "react-select";

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <img className='w-3' src={'/sort-arrow.svg'} alt='' />
    </components.DropdownIndicator>
  );
};