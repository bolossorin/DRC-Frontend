import React, { useState } from "react";

// libs
import cn from "classnames";
import Select from "react-select";

// components
import { H5, Paragraph } from "../../../common";

// components
import { DropdownIndicator, Switch } from "../../../common";

// assets
import styles from "./TableSetting.module.scss";

const perPage: { label: string; value: number }[] = [
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

interface IColumnSetting {
  label: string;
  key: string;
  checked: boolean;
}

interface ITableSetting {
  classname: string;
  pageLimit: number;
  columnSettings: IColumnSetting[];
  setColumnSettingsList: React.Dispatch<React.SetStateAction<IColumnSetting[]>>;
  onPageLimitChange: (limit: number) => void;
}

export const TableSetting = ({
  classname,
  columnSettings,
  setColumnSettingsList,
  onPageLimitChange,
  pageLimit,
}: ITableSetting) => {
  const [pageLimitOption, setPageLimitOption] = useState<typeof perPage[0]>(
    perPage.find((p) => p.value === pageLimit) ?? perPage[0]
  );

  const handleChangePageLimit = (option: { label: string; value: number }) => {
    setPageLimitOption(option);
    onPageLimitChange(option.value);
  };

  return (
    <div
      className={cn(
        "hidden absolute z-20 right-0 -bottom-0 translate-y-full bg-[#3C3C3C] border border-[#686868] min-w-[216px] rounded",
        styles.tableSetting,
        classname
      )}
    >
      <H5 classname="p-4 !mb-0 !text-white border-b border-[#686868]">Table Settings</H5>
      <div className="flex items-center justify-between p-4 border-b border-[#686868]">
        <Paragraph classname="!mb-0 !text-white">Vessels per Page</Paragraph>
        <div className="max-w-[80px]">
          <Select
            // @ts-ignore
            components={{ DropdownIndicator }}
            className="basic-single per-page"
            classNamePrefix="select"
            defaultValue={perPage[0]}
            name="color"
            options={perPage}
            value={pageLimitOption}
            onChange={(option) => handleChangePageLimit(option as any)}
          />
        </div>
      </div>
      <H5 classname="p-4 !mb-0 !text-white border-b border-[#686868]">Visible Columns</H5>
      <ul>
        {columnSettings.map((setting, index) => (
          <li
            key={setting.label}
            className="flex items-center justify-between text-sm px-4 py-3 border-b border-[#686868]"
          >
            {setting.label}
            <Switch
              onChange={(e) => {
                columnSettings[index].checked = !columnSettings[index].checked;
                setColumnSettingsList((prev) => {
                  const newState = [...prev];
                  newState[index].checked = e.target.checked;
                  return newState;
                });
              }}
              checked={setting.checked}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
