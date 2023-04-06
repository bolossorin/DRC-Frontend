import { getAccessToken, handleLogout } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = await getAccessToken(req, res, {
      refresh: true,
    });

    // if the user is not logged in, return an empty object
    if (!accessToken || typeof accessToken === "undefined") {
      await handleLogout(req, res);
      return res.status(400).json({});
    }

    res.status(200).json({
      accessToken,
    });
  } catch (e) {
    res.status(500).json(e);
  }
}
