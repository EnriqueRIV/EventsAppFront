import './prompConfirmation.css';

export const prompConfirmation = () => {
  const divPromp = document.createElement('div');
  divPromp.className = 'divPrompUser';
  const divConfirmation = document.createElement('div');
  divConfirmation.className = 'divConfirmation';
  divConfirmation.setAttribute('id', 'divConfirmation');
  const textConfirmation = document.createElement('div');
  textConfirmation.className = 'textConfirmation';
  const confirmationButton = document.createElement('div');
  confirmationButton.className = 'confirmationButton';

  divPromp.appendChild(divConfirmation);
  divConfirmation.appendChild(textConfirmation);
  divConfirmation.appendChild(confirmationButton);
  const prompConfirm = document.querySelector('.divPrompUser');

  document.querySelector('main').appendChild(divPromp);
  if (document.querySelector('.confirmationButton')) {
    document.querySelector('.confirmationButton').innerText = 'Continue';
    document
      .querySelector('.confirmationButton')
      .addEventListener('click', () => {
        divPromp.remove();
      });
  }
};
