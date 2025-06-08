export const fetchJson = async <ExpectedResult>(
  input: RequestInfo,
  options: RequestInit = {}
): Promise<ExpectedResult> => {
  const res = await fetch(input, {
    headers: {
      Accept: 'application/json',
    },
    ...options,
  });

  if (res.ok) {
    return res.json();
  }
  console.error('fetch fail', res.status, res);
  throw new Error('fetch fail');
};
