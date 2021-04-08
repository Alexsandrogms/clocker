interface CreateProfileProps {
  authentication: string;
  username: string;
}

export const createProfile = async ({
  authentication,
  username,
}: CreateProfileProps) => {
  const response = await fetch('/api/profile', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authentication}`,
    },
    method: 'POST',
    body: JSON.stringify({ username }),
  });

  return await response.json();
};
