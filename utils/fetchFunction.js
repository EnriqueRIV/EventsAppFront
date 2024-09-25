export const fetchFunction = (forComplete, atributes) => {
  const dataBig = fetch(
    `https://events-app-back-eight.vercel.app/api/${forComplete}`,
    atributes
  );
  return dataBig;
};
