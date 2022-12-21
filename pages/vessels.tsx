// components
import { H2, Layout, Paragraph, Input } from "../components/common";

export default function Vessels() {
  return (
    <Layout
      title='Vessels | Deep Render Cloud'
      description='Vessels | Deep Render Cloud'>
      <section>
        <div className='container'>
          <div className='flex items-center mb-6'>
            <H2 classname='mb-0'>Vessels</H2>
            <Paragraph classname='text-xl ml-4 mb-0 relative top-0.5'>(25)</Paragraph>
          </div>
          <div className='border border-[#535353] bg-[#282828] p-6'>
            <div className='max-w-[286px]'>
              <Input icon='/search.svg' type='search' placeholder='Search for vessels by attribute...' />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
