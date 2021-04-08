interface CreateProfileProps {
  authentication: string;
  username: string;
}

export const createProfile = async ({
  authentication,
  username,
}: CreateProfileProps) => {
  fetch('/api/profile', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authentication: `Bearer ${authentication}`,
    },
    method: 'POST',
    body: JSON.stringify({ username }),
  });
};
