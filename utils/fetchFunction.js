export const fetchFunctionContent = (
  forComplete,
  forMethod,
  forAuthorization,
  forBoby
) => {
  const dataBig = fetch(
    `https://events-app-back-eight.vercel.app/api/${forComplete}`,
    // `http://localhost:3000/api/${forComplete}`,
    {
      method: `${forMethod}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${forAuthorization}`
      },
      body: forBoby
    }
  );
  return dataBig;
};

export const fetchFunction = (
  forComplete,
  forMethod,
  forAuthorization,
  forBoby
) => {
  const dataBig = fetch(
    `https://events-app-back-eight.vercel.app/api/${forComplete}`,
    // `http://localhost:3000/api/${forComplete}`,
    {
      method: `${forMethod}`,
      headers: {
        Authorization: `${forAuthorization}`
      },
      body: forBoby
    }
  );
  return dataBig;
};
