import './login.css';
import { fetchFunction } from '../../utils/fetchFunction';
import { displayLoader, hideLoader } from '../../components/loader/loader';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import { displayUserNavBar } from '../../utils/displayUserNavBar';

const template = () =>
  `
  <article id="login">
  <div class="loginContainer">
  ${
    localStorage.getItem('user')
      ? `<h2>You are already logged</h2>`
      : `<form>
  <input type="text" placeholder="Username" id="username"/>
  <input type="password" placeholder="Password" id="password"/>
  <button id="loginbtn" class="infoBtn">Login</button>
  </form>`
  }
  </div>
  </article>
  `;

const loginSubmit = async () => {
  displayLoader();
  try {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const data = await fetchFunction('auth/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'Post',
      body: JSON.stringify({
        userName: username,
        password: password
      })
    });

    if (data.status === 400) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `The Username or Password are wrong! 🫣`;
      document.querySelector('.confirmationButton').innerText = 'Try Again! ';
      Login();
      return;
    } else if (data.status === 200) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Welcome ${username}! 🥳🎉`;
    }
    const dataRes = await data.json();
    localStorage.setItem('token', dataRes.token);
    localStorage.setItem('user', JSON.stringify(dataRes));
    displayUserNavBar();
  } catch (error) {
    console.error('Unexpected Error', error);
  } finally {
    hideLoader();
  }
};

const Login = () => {
  document.querySelector('.mainSection').innerHTML = template();
  document.querySelector('#loginbtn').addEventListener('click', (ev) => {
    ev.preventDefault();
    loginSubmit();
  });
};

export default Login;
