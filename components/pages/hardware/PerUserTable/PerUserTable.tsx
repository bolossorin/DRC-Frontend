import React, { FC } from "react";

// libs
import cn from "classnames";

// components
import { Cell, CelHeader, Row } from "../../vessels";
import { H6, Paragraph } from "@/components/common";

// assets
import styles from "./PerUserTable.module.scss";
import { ISessionOverview } from "@/graphql/types/hardware";

const headers = ["User", "Used", "Queue Usage"];

interface IPerUserTableProps {
  sessionsOverview: ISessionOverview[];
}

export const PerUserTable: FC<IPerUserTableProps> = ({ sessionsOverview }) => {
  return (
    <table className="w-full">
      <thead>
        <Row classname={cn(styles.row, styles.header)}>
          {headers.map((header) => (
            <CelHeader key={header}>{header}</CelHeader>
          ))}
        </Row>
      </thead>
      <tbody>
        {sessionsOverview.map((row, index) => (
          <Row key={index} classname={cn(styles.row, "w-full")}>
            <Cell classname="align-middle w-1/3">
              <div className="flex items-center">
                <img className="w-8 mr-2 rounded-full" src={row.profile_picture} alt="" />
                <Paragraph classname="mb-0 overflow-hidden text-ellipsis">{row.ipa_username}</Paragraph>
              </div>
            </Cell>
            <Cell classname="align-middle">{row.n_sessions}</Cell>
            <Cell classname="relative align-middle">
              {row.queues.slice(0, 1).map((queue, index) => (
                <div key={index} className={styles.queueUsage}>
                  {queue.n_sessions}
                  <span className="mx-2 text-[#A4A4A4]">x</span>
                  <div className="overflow-hidden text-ellipsis text-[#A4A4A4]">{queue.queue}</div>
                  <div className="ml-auto group p-2 min-w-[32px] w-8 h-8 border-[3px] border-[#2f2f2f] bg-[#535353] rounded-full transition-all hover:border-[#A4A4A4]">
                    <img className="h-full cursor-pointer" src={"/dots-horizontal.svg"} alt="" />
                    <div className="hidden group-hover:block absolute z-10 right-0 bottom-4 translate-y-full w-max min-w-[200px] rounded bg-[#3C3C3C] max-h-[288px] overflow-auto">
                      {row.queues.map((user, index) => (
                        <div key={index} className="border-b border-[#A4A4A4] flex items-center py-3 mx-4">
                          <div className="flex items-center">
                            <Paragraph classname="!mb-0 text-[#D9D9D9]">{user.n_sessions}</Paragraph>
                            <span className="mx-2 text-[#D9D9D9]">x</span>
                            <H6 classname="!mb-0 !font-medium text-[#D9D9D9]">{user.queue}</H6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Cell>
          </Row>
        ))}
      </tbody>
    </table>
  );
};
