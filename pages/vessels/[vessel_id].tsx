import React, { useEffect } from "react";

// libs
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { getSessionById } from "../../graphql/sessions/getSessionById";

import { useRegion } from "../../context/region";

// components
import { Layout, Paragraph, VesselTitle } from "../../components/common";
import { routes } from "../../utility/routes";
import { Connection, Experiments, Information } from "../../components/pages/vessel-id";
import { onSessionsChange } from "../../graphql/sessions/onSessionsChange";
import { ISession } from "../../graphql/types/session";

export default function VesselID() {
  const router = useRouter();
  const [region] = useRegion();

  const { data, subscribeToMore } = useQuery<{ session: ISession[]; my_sessions?: ISession[] }>(getSessionById, {
    variables: {
      id: router.query.vessel_id,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: onSessionsChange,
      variables: { region },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const subscriptionSessions = subscriptionData.data?.my_sessions ?? [];
        const updatedSessions = prev.session.map((session) => {
          const updatedSession = subscriptionSessions.find((s) => s.id === session.id);
          if (updatedSession) return updatedSession;
          return session;
        });
        return {
          session: updatedSessions,
        };
      },
    });

    return () => unsubscribe();
  }, [region]);

  const session = data?.session?.[0] ?? null;
  return (
    <Layout title="Vessel | Deep Render Cloud" description="Vessel | Deep Render Cloud" label={<VesselTitle />}>
      <div className="p-6 border-b border-[#686868]">
        <Link href={routes.vessels} legacyBehavior>
          <a className="inline-flex items-center transition-all cursor-pointer hover:opacity-70">
            <img className="w-2 mr-2.5" src={"/arrow.svg"} alt="" />
            <Paragraph classname="!text-base !mb-0">Back</Paragraph>
          </a>
        </Link>
      </div>
      <div className="flex flex-wrap">
        <Information vessel={session} />
        <Connection />
        <Experiments />
      </div>
    </Layout>
  );
}
