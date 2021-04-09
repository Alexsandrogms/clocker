import { NextApiRequest, NextApiResponse } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  query: { when: string };
}

export default async (req: any, res: NextApiResponse) => {
  console.log(req.query);

  return res.json({ ok: 'OK' });
};
