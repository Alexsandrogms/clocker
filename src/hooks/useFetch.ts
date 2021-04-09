import axios from 'axios';
import { getToken } from 'config/firebase/client';

type CalendarProps = {
  token: string;
  when: Date;
};

const getCalendar = async ({ when }: CalendarProps) => {
  const token = await getToken();

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
    url: '/api/profile',
    method: 'POST',
    data: { username },
  });

  return data;
};

type ScheduleProps = {
  when: string;
  username: string;
  name: string;
  phone: string;
};

const createSchedule = async (data: ScheduleProps) => {
  const response = await axios({
    method: 'POST',
    url: '/api/schedule',
    data,
  });

  return response.data;
};

export { getCalendar, getSchedule, createProfile, createSchedule };
