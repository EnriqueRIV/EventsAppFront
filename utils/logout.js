import Login from '../pages/login/Login';
import { prompConfirmation } from '../components/prompConfirmAttendance/prompConfirmation';

export const logout = (id) => {
  document.querySelector(id).addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    prompConfirmation();
    document.querySelector('.textConfirmation').innerText = `See you soon! 😜`;
    const userNavBarDisplay = document.querySelector('#userOptions');
    userNavBarDisplay.classList.remove('display');
    const loginLi = document.querySelector('#loginLi');
    loginLi.classList.add('display');
    const registerLi = document.querySelector('#registerLi');
    registerLi.classList.add('display');
    Login();
  });
};
