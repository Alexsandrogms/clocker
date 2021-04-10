import { NextApiRequest, NextApiResponse } from 'next';
import { differenceInHours, format, addHours } from 'date-fns';

import { firebaseAdmin } from 'config/firebase/admin';

const db = firebaseAdmin.firestore();
const profile = db.collection('profiles');
const calendar = db.collection('calendars');

const startAt = new Date(2021, 1, 1, 8, 0);
const endAt = new Date(2021, 1, 1, 17, 0);
const totalHours = differenceInHours(endAt, startAt);

const schedulesAvailable = [];

for (let index = 0; index <= totalHours; index++) {
  const time = format(addHours(startAt, index), 'HH:mm');
  schedulesAvailable.push(time);
}

interface CustomNextApiRequest extends NextApiRequest {
  query: {
    date: string;
    username: string;
  };
  body: {
    when: string;
    username: string;
    name: string;
    phone: string;
    time: string;
    date: Date;
  };
}

const getUserId = async (username: string) => {
  const profileDoc = await profile.where('username', '==', username).get();

  if (profileDoc.empty) return false;

  const { userId } = profileDoc.docs[0].data();

  return userId;
};

const getSchedule = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { date, username } = req.query;

  try {
    const userId = await getUserId(username);

    if (!userId) {
      return res.status(404).json({ error: 'username not exists!' });
    }

    const { docs } = await calendar
      .where('userId', '==', userId)
      .where('date', '==', date)
      .get();

    const schedulesUnavailable = docs.map((doc) => doc.data());

    const schedules = schedulesAvailable.map((time) => ({
      time,
      unavailable: !!schedulesUnavailable.find((t) => t.time === time),
    }));

    return res.status(200).json(schedules);
  } catch (error) {
    console.log('FB_ERROR_SCHEDULE: ', error);
    return res.status(401);
  }
};

const setSchedule = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { username, name, phone, date, time } = req.body;

  try {
    const userId = await getUserId(username);
    const docId = `${userId}#${date}#${time}`;

    const doc = await calendar.doc(docId).get();

    if (doc.exists) {
      return res.status(400).end();
    }

    const block = await calendar.doc(docId).set({
      userId,
      date,
      time,
      name,
      phone,
    });

    return res.status(201).json(block);
  } catch (error) {
    console.log('Error_fnc_setSchedule: ', error);
  }
};

const methods = {
  POST: setSchedule,
  GET: getSchedule,
};

export default async (req: NextApiRequest, res: NextApiResponse) =>
  methods[req.method] ? methods[req.method](req, res) : res.status(405);
