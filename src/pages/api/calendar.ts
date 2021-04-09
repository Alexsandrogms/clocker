import { NextApiRequest, NextApiResponse } from 'next';

import { firebaseAdmin } from 'config/firebase/admin';

interface CustomNextApiRequest extends NextApiRequest {
  query: { when: string };
}

const db = firebaseAdmin.firestore();
const calendar = db.collection('calendars');

export default async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers;
  const { when } = req.query;

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  const [_, token] = authorization.split(' ');

  try {
    const { user_id } = await firebaseAdmin.auth().verifyIdToken(token);

    const snapshot = await calendar
      .where('userId', '==', user_id)
      .where('when', '==', when)
      .get();

    return res.status(200).json(snapshot.docs);
  } catch (error) {
    console.log('FB_ERROR_CALENDAR: ', error);
    return res.status(401);
  }
};
