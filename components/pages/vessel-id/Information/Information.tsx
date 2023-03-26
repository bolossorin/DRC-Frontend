import React, { useState } from "react";
import { useRouter } from "next/router";

// libs
import cn from "classnames";

import { useMutation, useQuery } from "@apollo/client";
import { getSessionById } from "@/graphql/sessions/getSessionById";
import { stopSession } from "@/graphql/sessions/stopSession";

// components
import { Button, H4, State } from "@/components/common";
import { StopVesselsModal } from "@/components/common/Modals";

// assets
import styles from "./Information.module.scss";
import { ISession } from "@/graphql/types/session";
import { inactiveSessionStatuses } from "@/utility/inactiveSessionStatuses";

interface IInformation {
  vessel: ISession | null;
}

export const Information = ({ vessel }: IInformation) => {
  const [stopSessionMutation] = useMutation(stopSession, {
    onError: (errors) => console.log(errors),
    refetchQueries: [{ query: getSessionById, variables: { id: vessel?.id } }],
  });

  const [isStopModal, setIsStopModal] = useState(false);

  const stopSessions = async () => {
    await stopSessionMutation({
      variables: {
        id: vessel?.id,
      },
    });
    setIsStopModal(false);
  };

  return (
    <div className={cn("p-2 md:p-6 md:pb-0 w-full", styles.information)}>
      {isStopModal && (
        <StopVesselsModal setIsOpen={setIsStopModal} vessels={[vessel?.id ?? ""]} onStop={stopSessions} />
      )}
      <div className="px-2 md:px-6 pt-5 pb-2 bg-[#2F2F2F] rounded">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <H4 classname="!mb-0 flex items-center">
            <img className="w-8 mr-4" src={"/cube-green.svg"} alt="" />
            {vessel?.name}
          </H4>
          <div className="flex flex-wrap gap-4 md:gap-8 items-center w-full sm:w-auto">
            <Button
              size="medium"
              classname="w-full sm:w-auto"
              icon="/vs-code-white.svg"
              color="blue"
              disabled={inactiveSessionStatuses.includes(vessel?.state ?? "")}
              href={"https://" + vessel?.fqdn}
              target="_blank"
            >
              VS Code
            </Button>
            <Button
              onClick={() => setIsStopModal(true)}
              size="medium"
              classname="w-full sm:w-auto"
              icon="/stop-empty.svg"
              color="red"
              disabled={inactiveSessionStatuses.includes(vessel?.state ?? "")}
            >
              Stop
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-10 xl:gap-x-32 gap-y-5 md:gap-y-10">
          <ul className={styles.list}>
            <li className="flex items-center">
              <span>State :</span> <State state={vessel?.state ?? ""} fontSize="text-sm" />
            </li>
            <li>
              <span>Vessel ID:</span>
              {vessel?.id ?? ""}
            </li>
            <li>
              <>
                <span>Created at:</span>
                {vessel?.created_at ? new Date(vessel.created_at).toLocaleString("en-US") : ""}
              </>
            </li>
            <li>
              <>
                <span>Modified at:</span>
                {vessel?.modified_at ? new Date(vessel.modified_at).toLocaleString('en-US') : ""}
              </>
            </li>
            <li>
              <span>IP:</span>
              {vessel?.tailscale_ip ?? ""}
            </li>
            {/* <li>
              <span>Port:</span>22
            </li> */}
          </ul>
          <ul className={styles.list}>
            <li className="flex items-start">
              <span className="!w-20">GPUs:</span>
              <ul>
                {vessel?.gpu_ids?.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className={styles.list}>
            <li>
              <span>Queue:</span>
              {vessel?.queue ?? ""}
            </li>
            <li className="font-medium !text-[#F6F6F6]">
              <span>Docker Image:</span>
              {vessel?.image ?? ""}
            </li>
            <li>
              <span>GPU Utilisation:</span>
              {vessel?.avg_gpu_util ?? ""}
            </li>
            <li>
              <span>GPU Memory:</span>
              {vessel?.avg_gpu_memory_util ?? ""}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
