import { NextApiRequest, NextApiResponse } from 'next';
import { differenceInHours, format, addHours } from 'date-fns';

import { firebaseAdmin } from 'config/firebase/admin';

interface CustomNextApiRequest extends NextApiRequest {
  query: {
    when: string;
    username: string;
  };
}

const db = firebaseAdmin.firestore();
const profile = db.collection('profiles');
const calendar = db.collection('calendars');

const startAt = new Date(2021, 1, 1, 8, 0);
const endAt = new Date(2021, 1, 1, 17, 0);
const totalHours = differenceInHours(endAt, startAt);

const timeBlocks = [];

for (let index = 0; index <= totalHours; index++) {
  const time = format(addHours(startAt, index), 'HH:mm');
  timeBlocks.push(time);
}

export default async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { when, username } = req.query;

  try {
    // const profileDoc = await profile.where('username', '==', username).get();

    // const snapshot = await calendar
    //   .where('userId', '==', profileDoc)
    //   .where('when', '==', when)
    //   .get();

    return res.json(timeBlocks);
  } catch (error) {
    console.log('FB_ERROR: ', error);
    return res.status(401);
  }
};
