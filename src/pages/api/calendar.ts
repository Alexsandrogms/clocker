import { NextApiRequest, NextApiResponse } from 'next';
import { addHours, differenceInHours, format } from 'date-fns';

import { firebaseAdmin } from 'config/firebase/admin';

interface CustomNextApiRequest extends NextApiRequest {
  query: { date: string };
}

const db = firebaseAdmin.firestore();
const calendar = db.collection('calendars');

const startAt = new Date(2021, 1, 1, 8, 0);
const endAt = new Date(2021, 1, 1, 17, 0);
const totalHours = differenceInHours(endAt, startAt);

const schedulesAvailable = [];

for (let index = 0; index <= totalHours; index++) {
  const time = format(addHours(startAt, index), 'HH:mm');
  schedulesAvailable.push(time);
}

export default async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers;
  const { date } = req.query;

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  const [_, token] = authorization.split(' ');

  try {
    const { user_id } = await firebaseAdmin.auth().verifyIdToken(token);

    if (!user_id) {
      return res.status(404).json({ error: 'username not exists!' });
    }

    const { docs } = await calendar
      .where('userId', '==', user_id)
      .where('date', '==', date)
      .get();

    const schedulesUnavailable = docs.map((doc) => doc.data());

    const schedules = schedulesAvailable.map((time) => ({
      time,
      unavailable: !!schedulesUnavailable.find((t) => t.time === time),
      name: schedulesUnavailable.find((t) => t.time === time)?.name,
      phone: schedulesUnavailable.find((t) => t.time === time)?.phone,
    }));

    return res.status(200).json(schedules);
  } catch (error) {
    console.log('FB_ERROR_CALENDAR: ', error);
    return res.status(401);
  }
};
