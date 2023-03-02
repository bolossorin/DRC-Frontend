import React, { useEffect } from "react";

// libs
import cn from "classnames";

// components
import { H5, Paragraph, State } from "../../../common";
import { Updated } from "../../../common/Icons";

// assets
import styles from "./Notifications.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import { getNotifications } from "../../../../graphql/notifications/getNotifications";

import { INotification } from "../../../../graphql/types/notification";

//graphql
import { dismissNotificationById } from "../../../../graphql/notifications/dismissNotificationById";
import { dismissNotifications } from "../../../../graphql/notifications/dismissNotifications";
import { onNotificationAdded } from "../../../../graphql/notifications/onNotificationAdded";

interface INotifications {
  classname: string;
}

export const Notifications = ({ classname }: INotifications) => {
  const { data, subscribeToMore } = useQuery<
    { my_notifications: INotification[]; notifications?: INotification[] },
    { unread_only: boolean }
  >(getNotifications, {
    variables: {
      unread_only: true,
    },
  });
  const [dismissNotification] = useMutation(dismissNotificationById, {
    onError: (error) => console.log(error),
    refetchQueries: [{ query: getNotifications, variables: { unread_only: true } }],
  });

  const [dismissAllNotifications] = useMutation(dismissNotifications, {
    onError: (error) => console.log(error),
    refetchQueries: [{ query: getNotifications, variables: { unread_only: true } }],
  });

  useEffect(() => {
    subscribeToMore({
      document: onNotificationAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newNotifications = subscriptionData.data?.notifications?.filter((n) => !n.is_read) ?? [];
        return {
          my_notifications: [...newNotifications, ...prev.my_notifications],
        };
      },
    });
  }, []);

  return (
    <div
      className={cn(
        "hidden absolute z-20 w-[400px] max-w-[90vw] right-0 bottom-0 translate-y-full bg-[#3C3C3C] border border-[#686868]",
        classname
      )}
    >
      <div className="flex items-center py-4 px-3 md:px-5 border-b border-[#686868]">
        <H5 classname="!mb-0 !text-lg">Notifications</H5>
        <Paragraph classname="!mb-0 ml-4">({data?.my_notifications.length ?? 0})</Paragraph>
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
          {data?.my_notifications && data.my_notifications.length > 0 ? (
            data?.my_notifications.map((notification, index) => (
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
