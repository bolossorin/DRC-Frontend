import { useEffect, useState } from "react";

// libs
import cn from "classnames";
import Link from "next/link";

// components
import { Cel, CelHeader, Row, CopyButton, StopButton } from "../index";
import { Checkbox, List, State } from "@/components/common";
import { StopVesselsModal } from "@/components/common/Modals";

// assets
import styles from "./Table.module.scss";
import { ISession } from "@/graphql/types/session";
import listStyles from "@/components/common/List/List.module.scss";
import { inactiveSessionStatuses } from "@/utility/inactiveSessionStatuses";

interface IColumn<T> {
  label: string;
  key: string;
  renderCell?: (item: T, key: string) => React.ReactNode;
}

interface ITable {
  items: ISession[];
  columns: IColumn<ISession>[];
  selected: string[];
  selectAll: boolean;
  setSelectAll: (value: boolean) => void;
  setCurrentSelected: (value: string[] | ((value: string[]) => string[])) => void;
  onSessionStop: (id: string) => void;
}

export const Table = ({
  items,
  columns,
  selected,
  selectAll,
  setSelectAll,
  setCurrentSelected,
  onSessionStop,
}: ITable) => {
  const [isStopModal, setIsStopModal] = useState(false);
  const [vesselId, setVesselId] = useState<string>("");

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleSelect = (id: string) => () => {
    if (isSelected(id)) {
      return setCurrentSelected((prev) => prev.filter((x) => x !== id));
    }
    setCurrentSelected((prev) => [...prev, id]);
  };

  const handleOpenStopVesselModal = (id: string) => {
    setIsStopModal(true);
    setVesselId(id);
  };

  useEffect(() => {
    if (selectAll) {
      const newSelecteds = items.map((x) => x.id);
      setCurrentSelected(newSelecteds);
      return;
    }
    setCurrentSelected([]);
  }, [selectAll]);

  return (
    <>
      {isStopModal && (
        <StopVesselsModal
          setIsOpen={setIsStopModal}
          vessels={[vesselId]}
          onStop={() => {
            onSessionStop(vesselId);
            setIsStopModal(false);
          }}
        />
      )}
      <div className={cn("overflow-y-auto flex-1", styles.table)}>
        <div className={`min-w-[${210 * columns.length}px]`}>
          <Row>
            <Cel classname="w-12">
              <img className="opacity-50 w-4 h-4" src="/dots.svg" alt="" />
            </Cel>
            <Cel classname="flex">
              <Checkbox onChange={() => setSelectAll(!selectAll)} checked={selectAll} />
            </Cel>
            {columns.map((header) => (
              <CelHeader key={header.key}>{header.label}</CelHeader>
            ))}
          </Row>
          {items.map((row, index) => (
            <Row key={index} classname={cn({ "!bg-[#3A3A3A]": isSelected(row.id) })}>
              <Cel classname="w-12 cursor-pointer relative overflow-visible group">
                <img className="opacity-50 group-hover:opacity-100 transition-all w-4 h-4" src="/dots.svg" alt="" />
                <ul
                  className={cn(
                    "hidden group-hover:block w-max absolute z-20 top-4 left-4 rounded border border-[#686868] bg-[#3D3C3C]",
                    listStyles.list,
                    listStyles.small
                  )}
                >
                  <StopButton onClick={() => handleOpenStopVesselModal(row.id)} disabled={inactiveSessionStatuses.includes(row.state)} />
                  <li
                    className={cn(
                      "flex items-center border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none",
                      inactiveSessionStatuses.includes(row.state) && "opacity-50 cursor-default hover:bg-inherit"
                    )}
                  >
                    {!inactiveSessionStatuses.includes(row.state) ? (
                      <Link href={"https://" + row?.fqdn} target="_blank" className="flex items-center">
                        <img className="w-4 mr-3" src="/vs-code.svg" alt="" />
                        <p>VS Code</p>
                      </Link>
                    ) : (
                      <>
                        <img className="w-4 mr-3" src="/vs-code.svg" alt="" />
                        <p>VS Code</p>
                      </>
                    )}
                  </li>
                  <CopyButton content={row.ssh_config} label="Copy SSH Config" />
                  <CopyButton content={row.ssh_command} label="Copy SSH Command" />
                </ul>
              </Cel>
              <Cel classname="flex">
                <Checkbox onChange={handleSelect(row.id)} checked={isSelected(row.id)} />
              </Cel>
              {columns.map(({ renderCell, key }) =>
                renderCell ? renderCell(row, key) : <Cel key={key}>{row[key as keyof ISession]}</Cel>
              )}
            </Row>
          ))}
        </div>
      </div>
    </>
  );
};
