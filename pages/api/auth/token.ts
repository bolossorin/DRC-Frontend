import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res);

    // if the user is not logged in, return an empty object
    if (!session || typeof session === 'undefined') return res.status(400).json({});

    const { accessToken } = session;

    res.status(200).json({
      accessToken,
    });
  } catch (e) {
    res.status(500).json(e);
  }
}
