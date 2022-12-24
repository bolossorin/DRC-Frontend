import React from "react";

// libs
import Link from "next/link";

// components
import { Layout, Paragraph } from "../../components/common";
import { routes } from "../../utility/routes";

export default function VesselID() {

  return (
    <Layout
      title='Vessel | Deep Render Cloud'
      description='Vessel | Deep Render Cloud'>
      <div className='p-6'>
        <Link href={routes.vessels} legacyBehavior>
          <a className='inline-flex items-center transition-all cursor-pointer hover:opacity-70'>
            <img className='w-2 mr-2.5' src={'/arrow.svg'} alt='' />
            <Paragraph classname='!text-base !mb-0'>Back</Paragraph>
          </a>
        </Link>
      </div>
    </Layout>
  )
}
