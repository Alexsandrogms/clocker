import useSWR from 'swr';
import axios from 'axios';

type CalendarProps = {
  token: string;
  when: Date;
};

export const getCalendar = async ({ token, when }: CalendarProps) => {
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
