export const fetchFunction = (forComplete, atributes) => {
  const dataBig = fetch(
    `https://events-app-back-eight.vercel.app/api/${forComplete}`,
    // `http://localhost:3000/api/${forComplete}`,
    atributes
  );
  return dataBig;
};
