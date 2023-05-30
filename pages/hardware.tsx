import React from "react";

// components
import { H2, Layout } from "@/components/common";
import { CPU, GPU } from "@/components/pages/hardware";

export default function Hardware() {
  return (
    <Layout
      title="Hardware | Deep Render Cloud"
      description="Hardware | Deep Render Cloud"
      label={<H2 classname="!mb-0">Hardware</H2>}
    >
      <div className="p-2 md:p-6 flex-1 flex flex-wrap justify-between gap-y-6">
        <GPU />
        <CPU />
      </div>
    </Layout>
  );
}
