import './footer.css';

const footerTemplate = () => {
  return `
  <section class="footerSection">
  <div class="footerContainer">
  <p>Copyright © 2024 ERI. Reservados todos los derechos.</p>
  </div>
  </section>
  `;
};

export const printFooterTemplate = () => {
  document.querySelector('footer').innerHTML = footerTemplate();
};
