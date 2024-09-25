import { printHeaderTemplate } from '../../components/header/header';
import { displayLoader, hideLoader } from '../../components/loader/loader';
import { fetchFunction } from '../../utils/fetchFunction';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import Users from '../allUsers/allUsers';
import Login from '../login/Login';
import './updateUser.css';

const template = (name) => `
<article id="updateUser">
<div class="updateUserContainer">
${
  localStorage.getItem('user')
    ? ` <h2>Enter the data for update the profile of ${
        name
          ? `${name}`
          : `${JSON.parse(localStorage.getItem('user')).user.userName}`
      }</h2>
    <form class="registerForm" id="updateUserForm">
    <div class="labelContainer">
    <label for="username">Username:</label>
    <input type="text" placeholder="Username" id="username"/></div>
    <div class="labelContainer">
    <label for="firstname">Firstname:</label>
    <input type="text" placeholder="Firstname" id="firstname"/></div>
    <div class="labelContainer">
    <label for="lastname">Lastname:</label>
    <input type="text" placeholder="Lastname" id="lastname"/></div>
    <div class="labelContainer">
    <label for="password">Password:</label>
    <input type="password" placeholder="Password" id="password"/></div>
    <div class="labelContainer imgAv">
    <label for="imageavatar" class="prueba">Avatar:</label>
    <input type="file" placeholder="Avatar" id="imageavatar" accept="image/*"/></div>
    <div class="buttonsContainer1">
    <button id="updateuserbtn" class="infoBtn">Update</button>
    <button id="cancelbtn" class="infoBtn">Cancel</button></div>
  </form>`
    : `<h2>Error</h2>`
}
</div>
</article>
`;

const updateUserSubmit = async (user_id) => {
  displayLoader();
  try {
    const username = document.querySelector('#username').value;
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const password = document.querySelector('#password').value;
    const imageavatar = document.querySelector('#imageavatar').files[0];
    const events = [];

    let formData = new FormData();
    formData.append('userName', username);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('password', password);
    formData.append('imageAvatar', imageavatar);
    formData.append('events', events);

    const token = JSON.parse(localStorage.getItem('user')).token;
    const userId = user_id
      ? user_id
      : JSON.parse(localStorage.getItem('user')).user._id;
    const data = await fetchFunction(`auth/edit/${userId}`, {
      method: 'Put',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (data.status === 400) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `This username already exist, chosse another one`;
      UpdateUser(user_id);
      return;
    } else if (data.status === 200) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Successful! You must login for aply the updates!`;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      Login();
      printHeaderTemplate();
    }
  } catch (error) {
    console.error('Unexpected error', error);
  } finally {
    hideLoader();
  }
};

const UpdateUser = (user_id, name) => {
  document.querySelector('.mainSection').innerHTML = template(name);
  if (document.querySelector('#updateuserbtn')) {
    document.querySelector('#updateuserbtn').addEventListener('click', () => {
      updateUserSubmit(user_id);
    });
  }
  if (document.querySelector('#cancelbtn')) {
    document.querySelector('#cancelbtn').addEventListener('click', () => {
      document.querySelector('#updateUserForm').reset();
      Users();
    });
  }
};

export default UpdateUser;
