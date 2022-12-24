import React, { useState } from "react";

// libs
import cn from "classnames";
import Select from "react-select";

// components
import { H5, Paragraph } from "../../../common";

// components
import { DropdownIndicator, Switch } from '../../../common'

// assets
import styles from './TableSetting.module.scss'

const perPage: ({ label: string; value: string })[] = [
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

interface ITableSetting {
  classname: string
}

export const TableSetting = ({ classname }: ITableSetting) => {
  const [settingsList, setSettingsList] = useState<{ label: string, checked: boolean }[]>([
    { label: 'Vessel ID', checked: true },
    { label: 'Name', checked: false },
    { label: 'State', checked: true },
    { label: 'Queue', checked: false },
    { label: 'Docker Image', checked: false },
    { label: 'GPUs', checked: true },
    { label: 'GPU Utilisation', checked: false },
    { label: 'GPU Memory', checked: false },
    { label: 'Created at', checked: false },
  ]);

  return (
    <div
      className={cn('hidden absolute z-20 right-0 -bottom-0 translate-y-full bg-[#3C3C3C] border border-[#686868] min-w-[216px] rounded', styles.tableSetting, classname)}>
      <H5 classname='p-4 !mb-0 !text-white border-b border-[#686868]'>Table Settings</H5>
      <div className='flex items-center justify-between p-4 border-b border-[#686868]'>
        <Paragraph classname='!mb-0 !text-white'>
          Vessels per Page
        </Paragraph>
        <div className='max-w-[80px]'>
          <Select
            // @ts-ignore
            components={{ DropdownIndicator }}
            className="basic-single"
            classNamePrefix="select"
            defaultValue={perPage[0]}
            name="color"
            options={perPage} />
        </div>
      </div>
      <H5 classname='p-4 !mb-0 !text-white border-b border-[#686868]'>Visible Columns</H5>
      <ul>
        {settingsList.map((setting, index) =>
          <li
            key={setting.label}
            className='flex items-center justify-between text-sm px-4 py-3 border-b border-[#686868]'>
            {setting.label}
            <Switch
              onClick={() => {
                settingsList[index].checked = !settingsList[index].checked
                setSettingsList([...settingsList])
              }}
              checked={setting.checked} />
          </li>)}
      </ul>
    </div>
  )
}