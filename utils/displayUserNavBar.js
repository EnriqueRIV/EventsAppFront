import Home from '../pages/home/home';
import UserNavBar from '../components/usernavbar/UserNavBar';

export const displayUserNavBar = () => {
  const userNavBarDisplay = document.querySelector('#userOptions');
  userNavBarDisplay.classList.add('display');
  Home();
  UserNavBar();
  const loginLi = document.querySelector('#loginLi');
  loginLi.classList.remove('display');
  const registerLi = document.querySelector('#registerLi');
  registerLi.classList.remove('display');
};
