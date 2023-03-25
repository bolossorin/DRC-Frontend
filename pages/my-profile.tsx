import React from "react";

// components
import { H2, Layout } from "@/components/common";
import { PublicSSHKeys, UserInformation } from "@/components/pages/my-profile";

export default function MyProfile() {

  return (
    <Layout
      title='My Profile | Deep Render Cloud'
      description='My Profile | Deep Render Cloud'
      label={<H2 classname='!mb-0'>My Profile</H2>}>
      <div className='p-6'>
        <UserInformation />
        <PublicSSHKeys />
      </div>
    </Layout>
  )
}
