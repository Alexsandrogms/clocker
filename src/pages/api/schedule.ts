import { NextApiRequest, NextApiResponse } from 'next';
import { differenceInHours, format, addHours } from 'date-fns';

import { firebaseAdmin } from 'config/firebase/admin';

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

interface CustomNextApiRequest extends NextApiRequest {
  query: {
    when: string;
    username: string;
  };
  body: {
    when: string;
    username: string;
    name: string;
    phone: string;
  };
}

const getUserId = async (username: string) => {
  const profileDoc = await profile.where('username', '==', username).get();

  const { userId } = profileDoc.docs[0].data();

  return userId;
};

const getSchedule = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { when, username } = req.query;

  try {
    // const profileDoc = await profile.where('username', '==', username).get();

    // const snapshot = await calendar
    //   .where('userId', '==', profileDoc)
    //   .where('when', '==', when)
    //   .get();

    return res.status(200).json(timeBlocks);
  } catch (error) {
    console.log('FB_ERROR_SCHEDULE: ', error);
    return res.status(401);
  }
};

const setSchedule = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { username, when, name, phone } = req.body;

  try {
    const userId = await getUserId(username);

    const doc = await calendar.doc(`${userId}#${when}`).get();

    if (doc.exists) {
      return res.status(400);
    }

    await calendar.doc(`${userId}#${when}`).set({
      userId,
      when,
      name,
      phone,
    });

    return res.status(201);
  } catch (error) {
    console.log('Error_fnc_setSchedule: ', error);
  }
};

const methods = {
  GET: getSchedule,
  POST: setSchedule,
};

export default async (req: NextApiRequest, res: NextApiResponse) =>
  methods[req.method](req, res)
    ? methods[req.method](req, res)
    : res.status(405);
// {
//   const {
//     query: { when, username },
//     method,
//   } = req;

//   if (method === 'POST') {
//     console.log('post');
//   } else if (method === 'GET') {
//     console.log('get');
//   } else {
//     return res.status(405);
//   }

// };
