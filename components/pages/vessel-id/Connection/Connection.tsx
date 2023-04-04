import React from "react";
import cn from "classnames";

// components
import { Code, H4, H5 } from "@/components/common";

interface IConnection {
  sshConfig: string | null | undefined;
  sshCommand: string | null | undefined;
}

export const Connection = ({ sshConfig, sshCommand }: IConnection) => {
  const config = sshConfig ? sshConfig.split("\n") : null;
  return (
    <div className="p-2 md:p-6 md:pr-2 md:pt-4 w-full 2xl:w-[34%] flex flex-col">
      <div className="p-2 md:p-6 bg-[#2F2F2F] rounded flex-1">
        <H4 classname="!mb-4 flex items-center">
          <img className="w-5 mr-4" src={"/link.svg"} alt="" />
          Connection
        </H4>
        <H5 classname="!mb-5">SSH</H5>
        <div className="mb-6">
          <Code title="Command" classname={cn(!sshCommand && "opacity-50")}>
            {sshCommand ? sshCommand : ""}
          </Code>
        </div>
        <Code title="Config" classname={cn(!sshConfig && "opacity-50")}>
          {config?.map((el, i) => {
            const [key, value] = el.trim().split(" ");
            return (
              <React.Fragment key={el}>
                <span className={cn(i === 0 ? "text-[#88E207]" : "text-[#FFC36A] pl-6")}>{key}</span> {value}
                <br />
              </React.Fragment>
            );
          })}
        </Code>
      </div>
    </div>
  );
};
