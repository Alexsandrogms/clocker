import { NextApiRequest, NextApiResponse } from 'next';

import { firebaseAdmin } from 'config/firebase/admin';

interface CustomNextApiRequest extends NextApiRequest {
  body: {
    username: string;
  };
}

const db = firebaseAdmin.firestore();
const profile = db.collection('profiles');

export default async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const {
    body: { username },
    headers: { authorization },
  } = req;

  const [_, token] = authorization.split(' ');

  const { user_id: userId } = await firebaseAdmin.auth().verifyIdToken(token);

  profile.doc(username).set({
    userId,
    username,
  });

  res.status(200).json({ name: 'John Doe' });
};
