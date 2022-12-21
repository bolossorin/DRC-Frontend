// libs
import Select, { components, DropdownIndicatorProps } from 'react-select';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <img className='w-3' src={'/sort-arrow.svg'} alt='' />
    </components.DropdownIndicator>
  );
};

const locations: ({ label: string; value: string })[] = [
  { value: 'Europe', label: 'Europe' },
  { value: 'USA', label: 'USA' },
];

export const Location = () => {
  return (
    <Select
      controlShouldRenderValue={true}
      // @ts-ignore
      components={{ DropdownIndicator }}
      className="basic-single"
      classNamePrefix="select"
      defaultValue={locations[0]}
      name="color"
      options={locations}
    />
  )
}