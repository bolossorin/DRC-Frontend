import React from "react";

// libs
import Link from "next/link";
import cn from "classnames";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from 'chart.js'

ChartJS.register(ArcElement);

// components
import { Cel, CelHeader, Row } from "../../vessels";
import { State } from "../../../common";
import { routes } from "../../../../utility/routes";

// assets
import styles from './TableExperiments.module.scss'

const headers = ['Name', 'Project', 'State', 'Created', 'Created At']

const rows: { name: string, project: string, state: string, created: string, iteration1: number, iteration2: number }[] = [
  {
    name: 'test-merge-v8',
    project: 'test',
    state: 'Failed',
    created: '24 hours ago',
    iteration1: 200000,
    iteration2: 400000
  },
  {
    name: 'vessel-beta-hgx5_2-shag_gpu3_2',
    project: 'baseline_test',
    state: 'Stopped',
    created: '1 day ago',
    iteration1: 100000,
    iteration2: 300000
  },
  {
    name: 'flow-modes-test-v',
    project: 'seb-playground',
    state: 'Running',
    created: '2 days ago',
    iteration1: 2300000,
    iteration2: 4400000
  },
  {
    name: 'flow-modes-test-v6-FS 4',
    project: 'finetune-on-sequences yahyah',
    state: 'Crashed',
    created: '1 day ago',
    iteration1: 298000,
    iteration2: 300000
  },
]

export const TableExperiments = () => {
  return (
    <div className='overflow-auto'>
      <div className={cn('mt-6 border border-[#686868]', styles.tableExperiments)}>
        <Row>
          {headers.map(header => <CelHeader classname='!text-base text-[#F6F6F6]' key={header}>{header}</CelHeader>)}
        </Row>
        {rows.map((row, index) => (
          <Row key={index}>
            <Cel>
              <Link href={`${routes.vessels}/${row.name}`} legacyBehavior>
                <a className="underline hover:text-[#F6F6F6]">{row.name}</a>
              </Link>
            </Cel>
            <Cel>{row.project}</Cel>
            <Cel>
              <State state={row.state} />
            </Cel>
            <Cel>{row.created}</Cel>
            <Cel>
              <div className='flex items-center'>
                <div className='relative w-7 mr-2'>
                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px]'>
                {(row.iteration1 / row.iteration2 * 100).toFixed(0)}
                </span>
                  <Doughnut
                    data={{
                      datasets: [{
                        data: [row.iteration1, row.iteration2],
                        backgroundColor: [
                          '#D9D9D9',
                          '#88E207',
                        ],
                        hoverOffset: 4,
                        borderWidth: 1,
                        // @ts-ignore
                        cutout: '80%'
                      }]
                    }} />
                </div>
                {new Intl.NumberFormat('en-US').format(row.iteration1)} / {new Intl.NumberFormat('en-US').format(row.iteration2)}
              </div>
            </Cel>
          </Row>
        ))}
      </div>
    </div>
  )
}