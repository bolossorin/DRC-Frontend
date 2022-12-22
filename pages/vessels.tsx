import { useState } from "react";

// libs
import Select, { components } from "react-select";

// components
import { H2, Layout, Paragraph, Input } from "../components/common";
import { Actions, Pagination, Table } from "../components/pages";

const locations: any = [
  { value: 'Europe', label: 'Europe' },
  { value: 'USA', label: 'USA' },
];

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <img className='w-3' src={'/sort-arrow.svg'} alt='' />
    </components.DropdownIndicator>
  );
};

export default function Vessels() {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<{}[]>([]);

  return (
    <Layout
      title='Vessels | Deep Render Cloud'
      description='Vessels | Deep Render Cloud'>
      <section>
        <div className='container'>
          <div className='flex flex-col min-h-screen py-10 md:px-10'>
            <div className='flex items-center mb-6 w-full justify-between max-w-[1500px]'>
              <div className='flex items-center'>
                <H2 classname='mb-0'>Vessels</H2>
                <Paragraph classname='text-xl ml-4 !mb-0 relative top-0.5'>(25)</Paragraph>
              </div>
              <div className='flex items-center'>
                <div className='ml-2'>
                  <Select
                    controlShouldRenderValue={true}
                    components={{ DropdownIndicator }}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={locations[0]}
                    name="color"
                    options={locations}
                  />
                </div>
                <div className='ml-6 relative w-4 cursor-pointer opacity-50 hover:opacity-100 transition-all'>
                  <span className='absolute z-10 -right-1.5 -top-1.5 w-2 h-2 rounded-full bg-[#CA3C3C]' />
                  <img src='/bell.svg' alt='' />
                </div>
              </div>
            </div>
            <div className='border border-[#535353] bg-[#282828] flex-1 flex flex-col'>
              <div className='p-6 flex flex-wrap items-center justify-between  max-w-[1524px] gap-6'>
                <div className='sm:max-w-[286px] w-full'>
                  <Input icon='/search.svg' type='search' placeholder='Search for vessels by attribute...' />
                </div>
                <div className='flex flex-wrap items-center gap-8'>
                  <Actions currentSelected={currentSelected} />
                  <Pagination />
                  <div className='w-6 cursor-pointer transition-all opacity-50 hover:opacity-100'>
                    <img src='/setting.svg' alt='' />
                  </div>
                </div>
              </div>
              <Table
                selectAll={selectAll}
                setSelectAll={setSelectAll}
                setCurrentSelected={setCurrentSelected} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
