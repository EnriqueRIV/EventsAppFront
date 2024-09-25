export const linkPages = (id, page) => {
  document.querySelector(id).addEventListener('click', () => {
    page();
  });
};
