import axios from 'axios';
import { getIdToken } from 'config/firebase/client';

type CalendarProps = {
  token: string;
  when: Date;
};

export const getCalendar = async ({ when }: CalendarProps) => {
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
