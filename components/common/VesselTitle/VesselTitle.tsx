import React from "react";

// components
import { Paragraph } from "../Paragraph/Paragraph";
import { H2 } from "../H2/H2";

export const VesselTitle = ({ count }: { count?: number }) => {
  return (
    <>
      <H2 classname="!mb-0">Vessels</H2>
      {count !== undefined && (
        <Paragraph classname="text-lg md:text-xl ml-2 md:ml-4 !mb-0 relative top-0.5">{count}</Paragraph>
      )}
    </>
  );
};
