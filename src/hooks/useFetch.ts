import axios from 'axios';
import { getIdToken } from 'config/firebase/client';

interface CreateProfileProps {
  authentication: string;
  username: string;
}

const createProfile = async ({
  authentication,
  username,
}: CreateProfileProps) => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${authentication}`,
    },
    method: 'POST',
    data: { username },
  });

  return data;
};

type CalendarProps = {
  token: string;
  when: Date;
};

const getCalendar = async ({ when }: CalendarProps) => {
  const token = await getIdToken();
  const { data } = await axios({
    method: 'get',
    url: '/api/calendar',
    params: { when },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const getSchedule = async (when: Date) => {
  const { data } = await axios({
    method: 'get',
    url: '/api/schedule',
    params: { when },
  });

  return data;
};

export { createProfile, getCalendar, getSchedule };
