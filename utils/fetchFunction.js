export const fetchFunction = (
  forComplete,
  forMethod,
  forAuthorization,
  isJSONType,
  forBoby
) => {
  const headers = {
    Authorization: `${forAuthorization}`
  };

  if (isJSONType) {
    headers['Content-Type'] = 'application/json';
  }
  const dataBig = fetch(
    `https://events-app-back-eight.vercel.app/api/${forComplete}`,
    // `http://localhost:3000/api/${forComplete}`,
    {
      method: `${forMethod}`,
      headers,
      body: forBoby
    }
  );
  return dataBig;
};
