import './loader.css';

const loaderTemplate = () => {
  return `
  <div class="loaderContainer">
  </div>
  `;
};

export const displayLoader = () => {
  const loader = document.querySelector('.loaderSection');
  loader.classList.add('display');
};

export const hideLoader = () => {
  const loader = document.querySelector('.loaderSection');
  loader.classList.remove('display');
};

const Loader = () => {
  document.querySelector('.loaderSection').innerHTML = loaderTemplate();
};

export default Loader;
