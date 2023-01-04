import React from "react";

// components
import { Paragraph } from "../Paragraph/Paragraph";
import { H2 } from "../H2/H2";

export const VesselTitle = () => {
  return (
    <>
      <H2 classname='mb-0'>Vessels</H2>
      <Paragraph classname='text-xl ml-4 !mb-0 relative top-0.5'>(25)</Paragraph>
    </>
  )
}