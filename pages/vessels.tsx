// libs
import Select, { components } from "react-select";

// components
import { H2, Layout, Paragraph, Input } from "../components/common";
import { Table } from "../components/pages";

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
  return (
    <Layout
      title='Vessels | Deep Render Cloud'
      description='Vessels | Deep Render Cloud'>
      <section>
        <div className='container'>
          <div className='flex flex-col min-h-screen py-10 md:px-10'>
            <div className='flex items-center mb-6 w-full justify-between max-w-[1200px]'>
              <div className='flex items-center'>
                <H2 classname='mb-0'>Vessels</H2>
                <Paragraph classname='text-xl ml-4 !mb-0 relative top-0.5'>(25)</Paragraph>
              </div>
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
            </div>
            <div className='border border-[#535353] bg-[#282828] flex-1 flex flex-col'>
              <div className='p-6'>
                <div className='max-w-[286px]'>
                  <Input icon='/search.svg' type='search' placeholder='Search for vessels by attribute...' />
                </div>
              </div>
              <Table />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
