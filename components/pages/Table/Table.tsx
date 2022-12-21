import { useState } from "react";

// libs
import cn from "classnames";

// components
import { Cel, Row } from "../";
import { Checkbox, List, State } from "../../common";

// assets
import styles from './Table.module.scss'

interface IRows {
  selected: boolean,
  versel_id: string,
  name: string,
  state: string,
  queue: string,
  docker_image: string,
  gpu: string,
  gpu_util: string,
  gpu_memory: string,
  created_at: string
}

const headers = ['Vessel ID', 'Name', 'State', 'Queue', 'Docker Image', 'GPU’s', 'GPU Util.', 'GPU Memory', 'Created At']

const rowsInitial: IRows[] = [
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Requested',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: true,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Pulling Container',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Starting',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Running',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Stopping',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Stopped',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: true,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Idle',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Tailscale Cooking',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Warn Send',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Freed',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'GPU Lost',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Requested',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
  {
    selected: false,
    versel_id: '68333578-13a5-43df-a839-49ffed149988',
    name: 'Super Super Long Vessel Name!!',
    state: 'Crashed',
    queue: 'Super Super Long Queue Name',
    docker_image: 'vessel:v2.7.0.wdbiweubqoubdwwk',
    gpu: '1',
    gpu_util: '100%',
    gpu_memory: '100%',
    created_at: '2022-09-05T06:36:01.205Z'
  },
]
export const Table = () => {
  const [rows, setRows] = useState(rowsInitial);
  const [selectAll, setSelectAll] = useState(false);

  const isSelected = (index: number) => {
    rows[index].selected = !rows[index].selected;
    setRows([...rows]);
  }

  const handleAllSelected = () => {

    const newRows = rows.map(row => {
      row.selected = !selectAll
      return { ...row }
    })

    setSelectAll(!selectAll);
    setRows([...newRows]);
  }

  return (
    <div className={cn('overflow-y-auto flex-1', styles.table)}>
      <div className='min-w-[1900px]'>
        <div>
          <Row>
            <Cel classname='w-14'>
              <img className='opacity-50' src='/dots.svg' alt='' />
            </Cel>
            <Cel>
              <Checkbox onChange={handleAllSelected} checked={selectAll} />
            </Cel>
            {headers.map(header =>
              <Cel key={header}
                   classname='flex items-center text-white font-medium text-base group select-none cursor-pointer'>
                {header}
                <img
                  className='ml-2 w-3.5 opacity-50 group-hover:opacity-100 transition-all' src='/sort-arrow.svg'
                  alt='' />
              </Cel>)}
          </Row>
        </div>
        <div>
          {rows.map((row, index) => (
            <Row key={index} classname={cn({ '!bg-[#3A3A3A]': row.selected })}>
              <Cel classname='w-14 cursor-pointer relative overflow-visible group'>
                <img className='opacity-50 group-hover:opacity-100 transition-all' src='/dots.svg' alt='' />
                <List classname='group-hover:block' />
              </Cel>
              <Cel>
                <Checkbox onChange={() => isSelected(index)} checked={row.selected} />
              </Cel>
              <Cel>{row.versel_id}</Cel>
              <Cel>{row.name}</Cel>
              <Cel>
                <State state={row.state} />
              </Cel>
              <Cel>{row.queue}</Cel>
              <Cel>{row.docker_image}</Cel>
              <Cel>{row.gpu}</Cel>
              <Cel>{row.gpu_util}</Cel>
              <Cel>{row.gpu_memory}</Cel>
              <Cel>{row.created_at}</Cel>
            </Row>
          ))}
        </div>
      </div>
    </div>
  )
}