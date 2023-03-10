export const fetchJson = <ExpectedResult>(
  input: RequestInfo,
  options: RequestInit = {}
): Promise<ExpectedResult> => {
  return fetch(input, {
    headers: {
      Accept: 'application/json',
    },
    ...options,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    console.error('fetch fail', res.status, res);
    throw new Error('fetch fail');
  });
};
