import { useEffect, useState } from "react";

// libs
import cn from "classnames";
import Link from "next/link";

// components
import { Cell, Row, CopyButton, StopButton } from "../index";
import { Checkbox, H4 } from "@/components/common";
import { StopVesselsModal } from "@/components/common/Modals";

// assets
import { ISession } from "@/graphql/types/session";
import listStyles from "@/components/common/List/List.module.scss";
import { inactiveSessionStatuses } from "@/utility/inactiveSessionStatuses";
import styles from "./Table.module.scss";

interface IColumn<T> {
  label: string;
  key: string;
  renderCell?: (item: T, key: string) => React.ReactNode;
}

interface ITable {
  items: ISession[] | null;
  columns: IColumn<ISession>[];
  selected: SelectedVessel[];
  setCurrentSelected: (value: SelectedVessel[] | ((v: SelectedVessel[]) => SelectedVessel[])) => void;
  selectAll: boolean;
  setSelectAll: (value: boolean) => void;
  onSessionStop: (id: string) => void;
  className: string;
}

export interface SelectedVessel {
  id: string
  state: string
}

export const Table = (
  {
    items,
    columns,
    selected,
    selectAll,
    setSelectAll,
    setCurrentSelected,
    onSessionStop,
    className
  }: ITable) => {
  const [isStopModal, setIsStopModal] = useState(false);
  const [vesselId, setVesselId] = useState<string>("");
  const [isBottom, setIsBottom] = useState<boolean>(false);

  const isSelected = (id: string) => {
    for (const s of selected) {
      if (s.id === id) return true
    }
    return false
  }

  const handleSelect = (vessel: SelectedVessel) => () => {
    if (isSelected(vessel.id)) {
      return setCurrentSelected((prev: SelectedVessel[]) => prev.filter((x) => x.id !== vessel.id));
    }
    setCurrentSelected((prev: SelectedVessel[]) => [...prev, vessel]);
  };

  const handleOpenStopVesselModal = (id: string) => {
    setIsStopModal(true);
    setVesselId(id);
  };

  useEffect(() => {
    if (selectAll) {
      if (items) setCurrentSelected(items.map(x => ({ id: x.id, state: x.state })));
      return;
    }
    setCurrentSelected([]);
  }, [selectAll]);

  return (
    <>
      {isStopModal && (
        <StopVesselsModal
          setIsOpen={setIsStopModal}
          vessels={selected}
          onStop={() => {
            onSessionStop(vesselId);
            setIsStopModal(false);
          }}
        />
      )}
      <table className={className}>
        <thead>
          <Row classname={styles.row}>
            <Cell classname="w-12">
              <img className="opacity-50 min-w-[16px] w-4 h-4" src="/dots.svg" alt="" />
            </Cell>
            <Cell classname="w-[40px] relative top-0.5">
              <Checkbox onChange={() => setSelectAll(!selectAll)} checked={selectAll} />
            </Cell>
            {columns.map((header) => (
              <Cell classname={header.label.toLowerCase().replaceAll(' ', '')} key={header.key}>
                {header.label}
              </Cell>
            ))}
          </Row>
        </thead>
        <tbody>
          {items ? items.map((row, index) => (
              <Row key={index}
                  classname={cn({ "!bg-[#3A3A3A]": isSelected(row.id) }, styles.row, { [styles.animation]: (row.state === 'starting' || row.state === 'requested') })}>
                <Cell onMouseEnter={(e:any)=>{
                  const positionByBottom = window.innerHeight - e.clientY;
                  if (positionByBottom >= 200) {
                    setIsBottom(false)
                  } else {
                    setIsBottom(true)
                  }
                }} classname="!w-12 cursor-pointer relative overflow-visible group">
                  <img className="opacity-50 group-hover:opacity-100 transition-all w-4 h-4" src="/dots.svg" alt="" />
                  <ul
                    className={cn(
                      "hidden group-hover:block w-max absolute z-20 top-4 left-4 rounded border border-[#686868] bg-[#3D3C3C]",
                      listStyles.list,
                      listStyles.small,
                      { "-translate-y-full top-10" :isBottom}
                    )}
                  >
                    <StopButton
                      onClick={() => handleOpenStopVesselModal(row.id)}
                      disabled={inactiveSessionStatuses.includes(row.state)} />
                    <li
                      className={cn(
                        "flex items-center border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none",
                        inactiveSessionStatuses.includes(row.state) && "opacity-50 cursor-default hover:bg-inherit"
                      )}
                    >
                      {!inactiveSessionStatuses.includes(row.state) ? (
                        <Link href={"https://" + row?.fqdn} target="_blank" className="flex items-center">
                          <img className="w-4 mr-3" src="/vscode-alt.svg" alt="" />
                          <p>VS Code</p>
                        </Link>
                      ) : (
                        <>
                          <img className="w-4 mr-3" src="/vscode-alt.svg" alt="" />
                          <p>VS Code</p>
                        </>
                      )}
                    </li>
                    <CopyButton content={row.ssh_config} label="Copy SSH Config" />
                    <CopyButton content={row.ssh_command} label="Copy SSH Command" />
                  </ul>
                </Cell>
                <Cell classname="w-[40px] relative top-0.5">
                  <Checkbox onChange={handleSelect({ id: row.id, state: row.state })} checked={isSelected(row.id)} />
                </Cell>
                {columns.map(({ renderCell, key, label }) =>
                  renderCell ? renderCell(row, key)
                    : <Cell
                      classname={label.toLowerCase().replaceAll(' ', '')}
                      key={key}>
                      {row[key as keyof ISession]}
                    </Cell>
                )}
              </Row>
            ))
            : <Row>
              <Cell colspan={columns.length + 2}>
                <H4 classname="w-full text-center py-4">Loading...</H4>
              </Cell>
            </Row>}
          </tbody>
      </table>
    </>
  );
};
