import './register.css';
import Login from '../login/Login';
import { fetchFunction } from '../../utils/fetchFunction';
import { displayLoader, hideLoader } from '../../components/loader/loader';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import { displayUserNavBar } from '../../utils/displayUserNavBar';

const template = () => `
<article id="register">
<div class="registerContainer">
${
  localStorage.getItem('user')
    ? `<h2>You are already register and logged</h2>`
    : `<h2>Enter your data for complete the register</h2>
    <form class="form" id="registerForm">
    <div class="labelContainer">
    <label for="username">Username:*</label>
    <input type="text" placeholder="Username" id="username" required/></div>
    <div class="labelContainer">
    <label for="firstname">Firstname:*</label>
    <input type="text" placeholder="Firstname" id="firstname" required/></div>
    <div class="labelContainer">
    <label for="lastname">Lastname:*</label>
    <input type="text" placeholder="Lastname" id="lastname" required/></div>
    <div class="labelContainer">
    <label for="password">Password:*</label>
    <input type="password" placeholder="Password" id="password" required/></div>
    <div class="labelContainer">
    <label for="useremail">Email:*</label>
    <input type="email" placeholder="Email" id="useremail" required/></div>
    <div class="labelContainer imgAv">
    <label for="imageavatar" class="prueba">Avatar:</label>
    <input type="file" placeholder="Avatar" id="imageavatar" accept="image/*"/></div>
    <div class="labelContainer">All the fields with (*) are required</div>
    <div class="buttonsContainer">
    <button id="registerbtn" class="infoBtn">Register</button>
    <button id="cancelbtn" class="infoBtn">Cancel</button></div>
  </form>`
}
</div>
</article>
`;

const registerSubmit = async () => {
  displayLoader();
  try {
    const username = document.querySelector('#username').value;
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const password = document.querySelector('#password').value;
    const useremail = document.querySelector('#useremail').value;
    const imageavatar = document.querySelector('#imageavatar').files[0];

    let formData = new FormData();
    formData.append('userName', username);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('password', password);
    formData.append('userEmail', useremail);
    formData.append('imageAvatar', imageavatar);

    const data = await fetchFunction(
      'auth/register',
      'Post',
      '',
      false,
      formData
    );

    if (data.status === 400) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `This username or email already exist, choose another one`;
      Login();
      return;
    } else if (data.status === 200) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Register successful! Welcome ${username}!`;
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

const Register = () => {
  document.querySelector('.mainSection').innerHTML = template();
  if (document.querySelector('#registerbtn')) {
    document.querySelector('#registerbtn').addEventListener('click', () => {
      registerSubmit();
    });
  }
  if (document.querySelector('#cancelbtn')) {
    document.querySelector('#cancelbtn').addEventListener('click', () => {
      document.querySelector('#registerForm').reset();
    });
  }
};

export default Register;
