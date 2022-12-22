// libs
import Select from 'react-select';

// components
import { DropdownIndicator } from '../../../common'

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