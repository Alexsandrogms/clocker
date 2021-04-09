import axios from 'axios';

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

export default createProfile;
