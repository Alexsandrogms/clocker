import axios from 'axios';
import { getToken } from 'config/firebase/client';
import { format } from 'date-fns';

type CalendarProps = {
  when: Date;
};

const getCalendar = async ({ when }: CalendarProps) => {
  try {
    const token = await getToken();

    const { data } = await axios({
      method: 'get',
      url: '/api/calendar',
      params: { date: format(when, 'yyyy-MM-dd') },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log('useFetch_fnc_getCalendar: ', error);
  }
};

const getSchedule = async (date: Date, username: string) => {
  const { data } = await axios({
    method: 'get',
    url: '/api/schedule',
    params: {
      username,
      date: format(date, 'yyyy-MM-dd'),
    },
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
  time: string;
  date: Date;
  username: string;
  name: string;
  phone: string;
};

const createSchedule = async ({ date, ...data }: ScheduleProps) => {
  const response = await axios({
    method: 'POST',
    url: '/api/schedule',
    data: {
      ...data,
      date: format(date, 'yyyy-MM-dd'),
    },
  });

  return response.data;
};

export { getCalendar, getSchedule, createProfile, createSchedule };
