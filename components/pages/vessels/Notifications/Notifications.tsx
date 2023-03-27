import React, { useEffect } from "react";

// libs
import cn from "classnames";

// components
import { H5, Paragraph, State } from "../../../common";
import { Updated } from "../../../common/Icons";

// assets
import styles from "./Notifications.module.scss";
import { useMutation } from "@apollo/client";
import { getNotifications } from "../../../../graphql/notifications/getNotifications";

import { INotification } from "../../../../graphql/types/notification";

//graphql
import { dismissNotificationById } from "../../../../graphql/notifications/dismissNotificationById";
import { dismissNotifications } from "../../../../graphql/notifications/dismissNotifications";

interface INotifications {
  notifications: INotification[];
}

export const Notifications = ({ notifications }: INotifications) => {
  const [dismissNotification] = useMutation(dismissNotificationById, {
    onError: (error) => console.log(error),
    refetchQueries: [{ query: getNotifications, variables: { unread_only: true } }],
  });

  const [dismissAllNotifications] = useMutation(dismissNotifications, {
    onError: (error) => console.log(error),
    refetchQueries: [{ query: getNotifications, variables: { unread_only: true } }],
  });

  return (
    <div
      className="border-0 absolute z-20 w-[400px] max-w-[90vw] right-0 bottom-0 translate-y-full bg-[#3C3C3C] border-[#686868] max-h-0 overflow-hidden transition-all group-hover:border group-hover:max-h-[650px]"
    >
      <div className="flex items-center py-4 px-3 md:px-5 border-b border-[#686868]">
        <H5 classname="!mb-0 !text-lg">Notifications</H5>
        <Paragraph classname="!mb-0 ml-4">({notifications.length})</Paragraph>
        <div
          className="ml-auto cursor-pointer hover:opacity-50 select-none transition-all"
          onClick={() =>
            dismissAllNotifications({
              variables: {
                status: "all",
              },
            })
          }
        >
          <Paragraph classname="!mb-0 whitespace-nowrap">Read All</Paragraph>
        </div>
      </div>
      <div className="overflow-auto">
        <div className="max-h-[540px]">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="py-5 pl-2 md:pl-7 pr-3 md:pr-10 border-b border-[#686868]">
                <div className="flex items-center">
                  {/* <div className="w-8">
                    <img src={notification.icon} alt="" />
                  </div> */}
                  <div className="ml-3 md:ml-7 flex-1">
                    <div
                      className={cn(
                        "flex items-center border-b border-[#535353] pb-2 mb-4 ",
                        styles[notification.status]
                      )}
                    >
                      <div className="w-6 mr-4">
                        <Updated />
                      </div>
                      State Updated
                      <div
                        onClick={() =>
                          dismissNotification({
                            variables: { id: notification.id },
                          })
                        }
                        className="w-3 ml-auto cursor-pointer opacity-50 transition-all hover:opacity-100"
                      >
                        <img src="/close.svg" alt="" />
                      </div>
                    </div>
                    <Paragraph>{notification.title}</Paragraph>
                    {notification.status && (
                      <div className="flex flex-wrap items-center gap-3">
                        <Paragraph classname="!mb-0 text-[#D9D9D9]">has entered state</Paragraph>
                        <State fontSize="text-sm" state={notification.status} />
                      </div>
                    )}
                    {notification.description && (
                      <Paragraph classname="!mb-0 text-[#D9D9D9] mt-2">{notification.description}</Paragraph>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Paragraph classname="!mb-0 text-[#D9D9D9] p-4 text-center">Empty</Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};
