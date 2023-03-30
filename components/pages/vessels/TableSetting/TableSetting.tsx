import React, { useEffect, useState } from "react";

// libs
import cn from "classnames";
import Select from "react-select";

// components
import { H5, Paragraph, DropdownIndicator, Switch } from "@/components/common";

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
  pageLimit: number;
  columnSettings: IColumnSetting[];
  setColumnSettingsList: React.Dispatch<React.SetStateAction<IColumnSetting[]>>;
  onPageLimitChange: (limit: number) => void;
}

export const TableSetting = ({
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
    localStorage.setItem("pageLimit", JSON.stringify(option));
  };

  // Load saved state
  useEffect(() => {
    loadVisibleColumnsState(columnSettings, setColumnSettingsList);
    loadPageLimit(handleChangePageLimit);
  }, [])

  return (
    <div
      className={cn(
        "max-h-0 border-0 absolute z-20 right-0 -bottom-0 translate-y-full bg-[#3C3C3C] border-[#686868] min-w-[216px] rounded transition-all duration-300 overflow-hidden group-hover:max-h-[800px] group-hover:border",
        styles.tableSetting,
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
                  localStorage.setItem('visibleColumns', JSON.stringify(newState))
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

/**
 * Load information about visible columns from local storage.
 * Called once on load.
 */
function loadVisibleColumnsState(
  columnSettings: IColumnSetting[],
  setColumnSettingsList: React.Dispatch<React.SetStateAction<IColumnSetting[]>>
) {
  const state = localStorage.getItem('visibleColumns')
  if (!state) return

  const findColumn = (key: string) => {
    for (let i=0; i<columnSettings.length; i++) {
      if (columnSettings[i].key === key) {
        return i
      }
    }
    return -1
  }

  try {
    const columns = JSON.parse(state)
    setColumnSettingsList((prev) => {
      const newState = [...prev];
      columns.forEach((column: IColumnSetting) => {
        const index = findColumn(column.key)
        if (index === -1) return
        newState[index].checked = column.checked;
      })
      return newState;
    });
  }
  catch(err) {
    console.error(err)
  }
}

/**
 * Load information about page limit from local storage.
 * Called once on load.
 */
function loadPageLimit(setPageLimit: (arg0: { label: string; value: number }) => void) {
  const state = localStorage.getItem('pageLimit')
  if (!state) return

  try {
    const option = JSON.parse(state)
    setPageLimit(option)
  }
  catch(err) {
    console.error(err)
  }
}