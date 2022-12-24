import React, { useState } from "react";

// libs
import cn from "classnames";

// components
import { H4 } from "../../../common";
import { Filters, Search } from "../../vessels";
import { IFilter } from "../../../../utility/types";
import { TableExperiments } from "../";

// assets
import styles from './Experiments.module.scss'

export const Experiments = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);

  return (
    <div className='p-6 pt-4 w-full 2xl:w-[65%]'>
      <div className='p-6 bg-[#2F2F2F] rounded'>
        <H4 classname='!mb-6 flex items-center'>
          <img className='w-5 mr-4' src={'/pytorch-seek.svg'} alt='' />
          Experiments
        </H4>
        <div className='flex items-start'>
          <div className={cn('max-w-[224px]', styles.search)}>
            <Search placeholder='Search' setFilters={setFilters} filters={filters} />
          </div>
          <div className='px-6'>
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>
        <TableExperiments />
      </div>
    </div>
  )
}