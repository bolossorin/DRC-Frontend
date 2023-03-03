import { useQuery } from "@apollo/client";
import React, { FC, useEffect } from "react";
import { getNotifications } from "../../../graphql/notifications/getNotifications";
import { onNotificationAdded } from "../../../graphql/notifications/onNotificationAdded";
import { INotification } from "../../../graphql/types/notification";

// components
import { Location, Notifications } from "../../pages/vessels";

interface IHeader {
  label: string;
}

export const Header: FC<IHeader> = ({ label }) => {
  const { data, subscribeToMore } = useQuery<
    { my_notifications: INotification[]; notifications?: INotification[] },
    { unread_only: boolean }
  >(getNotifications, {
    variables: {
      unread_only: true,
    },
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
    <div className="flex items-center mb-6 w-full justify-between max-w-[1540px]">
      <div className="flex items-center">{label}</div>
      <div className="flex items-center">
        <div className="ml-2">
          <Location />
        </div>
        <div className="ml-9 mr-2 relative w-4 group">
          {data?.my_notifications && data.my_notifications.length > 0 && (
            <span className="absolute z-10 -right-1.5 -top-1.5 w-2 h-2 rounded-full bg-[#CA3C3C]" />
          )}
          <img className="cursor-pointer opacity-50 group-hover:opacity-100 transition-all" src="/bell.svg" alt="" />
          <Notifications classname="group-hover:block" notifications={data?.my_notifications ?? []} />
        </div>
      </div>
    </div>
  );
};
