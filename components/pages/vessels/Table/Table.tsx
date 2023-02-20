import { useEffect, useState } from "react";

// libs
import cn from "classnames";
import Link from "next/link";

// components
import { Cel, CelHeader, Row } from "../index";
import { Checkbox, List, State } from "../../../common";
import { routes } from "../../../../utility/routes";

// assets
import styles from "./Table.module.scss";
import { ISession } from "../../../../graphql/types/session";

interface IRows {
  id: number;
  selected: boolean;
  versel_id: string;
  name: string;
  state: string;
  queue: string;
  docker_image: string;
  gpu: string;
  gpu_util: string;
  gpu_memory: string;
  created_at: string;
}

const headers = [
  { label: "Vessel ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "State", key: "state" },
  { label: "Queue", key: "queue" },
  { label: "Docker Image", key: "image" },
  { label: "GPU’s", key: "n_gpus" },
  { label: "GPU Util", key: "avg_gpu_util" },
  { label: "GPU Memory", key: "avg_gpu_memory_util" },
  { label: "Created At", key: "created_at" },
];

const rowsInitial: IRows[] = [
  {
    id: 1,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Requested",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 2,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Pulling Container",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 3,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Starting",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 4,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Running",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 5,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Stopping",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 6,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Stopped",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 7,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Idle",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 8,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Tailscale Cooking",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 9,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Warn Send",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 10,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Freed",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 11,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "GPU Lost",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 12,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Requested",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 13,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Crashed",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
  {
    id: 14,
    selected: false,
    versel_id: "68333578-13a5-43df-a839-49ffed149988",
    name: "Super Super Long Vessel Name!!",
    state: "Crashed",
    queue: "Super Super Long Queue Name",
    docker_image: "vessel:v2.7.0.wdbiweubqoubdwwk",
    gpu: "1",
    gpu_util: "100%",
    gpu_memory: "100%",
    created_at: "2022-09-05T06:36:01.205Z",
  },
];

interface ITable {
  items: ISession[];
  selected: string[];
  selectAll: boolean;
  setSelectAll: (value: boolean) => void;
  setCurrentSelected: (value: string[] | ((value: string[]) => string[])) => void;
}

const list = [
  { icon: "/stop.svg", title: "Stop" },
  { icon: "/vs-code.svg", title: "VS Code" },
  { icon: "/ssh.svg", title: "Copy SSH Config" },
  { icon: "/ssh.svg", title: "Copy SSH Command" },
];

export const Table = ({ items, selected, selectAll, setSelectAll, setCurrentSelected }: ITable) => {
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleSelect = (id: string) => () => {
    if (isSelected(id)) {
      return setCurrentSelected((prev) => prev.filter((x) => x !== id));
    }
    setCurrentSelected((prev) => [...prev, id]);
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
    <div className={cn("overflow-y-auto flex-1", styles.table)}>
      <div className="min-w-[1900px]">
        <Row>
          <Cel classname="w-12">
            <img className="opacity-50" src="/dots.svg" alt="" />
          </Cel>
          <Cel classname="flex">
            <Checkbox onChange={() => setSelectAll(!selectAll)} checked={selectAll} />
          </Cel>
          {headers.map((header) => (
            <CelHeader key={header.key}>{header.label}</CelHeader>
          ))}
        </Row>
        {items.map((row, index) => (
          <Row key={index} classname={cn({ "!bg-[#3A3A3A]": isSelected(row.id) })}>
            <Cel classname="w-12 cursor-pointer relative overflow-visible group">
              <img className="opacity-50 group-hover:opacity-100 transition-all" src="/dots.svg" alt="" />
              <List size="small" list={list} classname="group-hover:block" />
            </Cel>
            <Cel classname="flex">
              <Checkbox onChange={handleSelect(row.id)} checked={isSelected(row.id)} />
            </Cel>
            <Cel>
              <Link href={`${routes.vessels}/${row.id}`} legacyBehavior>
                <a className="hover:underline">{row.id}</a>
              </Link>
            </Cel>
            <Cel>{row.name}</Cel>
            <Cel>
              <State state={row.state} />
            </Cel>
            <Cel>{row.queue}</Cel>
            <Cel>{row.image}</Cel>
            <Cel>{row.n_gpus}</Cel>
            <Cel>{row.avg_gpu_util}</Cel>
            <Cel>{row.avg_gpu_memory_util}</Cel>
            <Cel>{row.created_at}</Cel>
          </Row>
        ))}
      </div>
    </div>
  );
};
