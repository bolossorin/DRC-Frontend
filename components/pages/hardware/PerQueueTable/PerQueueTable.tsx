import React, { FC, useState } from "react";

// libs
import cn from "classnames";

// components
import { Cell, CelHeader, Row } from "../../vessels";
import { H6, Paragraph, Dropdown } from "@/components/common";

// assets
import styles from "./PerQueueTable.module.scss";
import { IQueueUsage } from "@/graphql/types/hardware";

const headers = ["Queue", "Free", "Used", "Total", "Users"];

interface IPerQueueTable {
  queueUsage: IQueueUsage[];
}

export const PerQueueTable: FC<IPerQueueTable> = ({ queueUsage }) => {
  const [openedMenu, setOpenedMenu] = useState<number>(-1);

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
        {queueUsage.map((row, queueIndex) => (
          <Row key={queueIndex} classname={styles.row}>
            <Cell classname="align-middle">{row.queue}</Cell>
            <Cell classname="align-middle">{row.free}</Cell>
            <Cell classname="align-middle">{row.used}</Cell>
            <Cell classname="align-middle">{row.total}</Cell>
            <Cell classname="relative align-middle">
              <div className="flex items-center ml-3">
                {row.users.slice(0, 4).map((user, index) => (
                  <div
                    key={index}
                    className="group min-w-[36px] w-9 h-9 border-[3px] border-[#2f2f2f] rounded-full -ml-2 transition-all cursor-pointer hover:border-[#A4A4A4]"
                  >
                    <img className="h-full object-cover rounded-full" src={user.profile_picture} alt="" />
                    <div className="hidden group-hover:flex items-center w-max min-w-[200px] py-3 px-4 absolute z-10 right-0 top-2 -translate-y-full rounded bg-[#3C3C3C]">
                      <img className="mr-3 w-8 rounded-full" src={user.profile_picture} alt="" />
                      <div className="">
                        <H6 classname="!mb-0 !font-medium">{user.ipa_username}</H6>
                        <Paragraph classname="!mb-0 text-[#A4A4A4]">x {user.n_sessions}</Paragraph>
                      </div>
                    </div>
                  </div>
                ))}
                {row.users.length >= 4 && (
                  <div
                    onMouseEnter={() => setOpenedMenu(queueIndex)}
                    onMouseLeave={() => setOpenedMenu(-1)}
                    className="group p-2 min-w[36px] w-9 h-9 border-[3px] border-[#2f2f2f] bg-[#535353] rounded-full -ml-3 transition-all hover:border-[#A4A4A4] flex justify-center"
                  >
                    <Dropdown
                      open={queueIndex === openedMenu}
                      trigger={<img className="h-full cursor-pointer" src={"/dots-horizontal.svg"} alt="" />}
                    >
                      <div
                        className="w-max min-w-[200px] rounded bg-[#3C3C3C] max-h-[300px] overflow-auto"
                        onMouseLeave={() => setOpenedMenu(-1)}
                      >
                        {row.users.map((user, userIndex, arr) => (
                          <div
                            key={userIndex}
                            className={cn(
                              "border-b border-[#A4A4A4] flex items-center py-2 mx-4",
                              userIndex === arr.length - 1 && "border-b-0"
                            )}
                          >
                            <img className="mr-4 w-9 rounded-full" src={user.profile_picture} alt="" />
                            <div className="">
                              <H6 classname="!mb-0 !font-medium">{user.ipa_username}</H6>
                              <Paragraph classname="!mb-0 text-[#A4A4A4]">x {user.n_sessions}</Paragraph>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Dropdown>
                  </div>
                )}
              </div>
            </Cell>
          </Row>
        ))}
      </tbody>
    </table>
  );
};
