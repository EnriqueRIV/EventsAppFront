import { displayLoader, hideLoader } from '../../components/loader/loader';
import { fetchFunction } from '../../utils/fetchFunction';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import Users from '../allUsers/allUsers';
import UpdateUser from '../updateUser/updateUser';
import './userprofile.css';

const template = (name) => `
<article id="userprofile">
<h2>Hi ${JSON.parse(localStorage.getItem('user')).user.userName}</h2>
${
  3 < 5
    ? `<h2>The profile details for ${name} are:</h2>`
    : `<h2>The profile details for ${
        JSON.parse(localStorage.getItem('user')).user.userName
      } are:</h2>`
}
<div id="userProfileContainer">
<div id="profileContainer"></div>
<div class="optionsButtonsContainer">
</div>
</div>
</article>
`;

const getUserProfile = async (user_id) => {
  displayLoader();
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const userId = user_id
      ? user_id
      : JSON.parse(localStorage.getItem('user')).user._id;
    const userData = await fetchFunction(
      `auth/${userId}`,
      'Get',
      `Bearer ${token}`,
      true
    );
    const user = await userData.json();
    const profileContainer = document.querySelector('#profileContainer');
    const divAvatar = document.createElement('div');
    divAvatar.className = 'imgAvatarContainer';
    const divUserProfileDetails = document.createElement('div');
    divUserProfileDetails.className = 'dataProfileContainer';
    divAvatar.innerHTML = `
    <img src=${user.imageAvatar} alt=${user.firstname}/>
    <h3>Avatar</h3>
    `;
    divUserProfileDetails.innerHTML = `
    <h4>Username: <span>${user.userName}</span></h4>
    <h4>Firstname: <span>${user.firstname}</span></h4>
    <h4>Lastname: <span>${user.lastname}</span></h4>
    <h4>Email: <span>${user.userEmail}</span></h4> 
    `;
    profileContainer.appendChild(divUserProfileDetails);
    profileContainer.appendChild(divAvatar);
  } catch (error) {
    console.error('error', error);
  } finally {
    hideLoader();
  }
};

const updateButtonUser = (user_id, name) => {
  const buttonsContainer = document.querySelector('.optionsButtonsContainer');
  const updateButton = document.createElement('button');
  updateButton.id = 'updatebtn';
  updateButton.className = 'infoBtn';
  updateButton.textContent = 'Update?';
  buttonsContainer.appendChild(updateButton);
  document.querySelector('#updatebtn').addEventListener('click', () => {
    UpdateUser(user_id, name);
  });
};

const deleteButtonAdmin = (user_id) => {
  if (JSON.parse(localStorage.getItem('user')).user.role === 'admin') {
    const buttonsContainer = document.querySelector('.optionsButtonsContainer');
    const deleteButton = document.createElement('button');
    deleteButton.id = 'deletebtn';
    deleteButton.className = 'infoBtn';
    deleteButton.textContent = 'Delete';
    buttonsContainer.appendChild(deleteButton);
    document.querySelector('#deletebtn').addEventListener('click', () => {
      deleteUser(user_id);
      deleteUserEvent(user_id);
    });
  }
};

export const deleteUserEvent = async (user_id) => {
  const eventData = await fetchFunction('events', 'Get');
  const events = await eventData.json();
  for (let event of events) {
    if (event.asis.includes(user_id)) {
      const token = JSON.parse(localStorage.getItem('user')).token;
      const dataEvent = await fetchFunction(
        `user/${event._id}`,
        'Put',
        `Bearer ${token}`,
        true,
        JSON.stringify({
          asis: user_id
        })
      );
    }
  }
};

const deleteUser = async (user_id) => {
  displayLoader();
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const userDelete = await fetchFunction(
      `auth/delete/${user_id}`,
      'Delete',
      `Bearer ${token}`
    );
    if (userDelete.status === 200) {
      prompConfirmation();
      document.querySelector('.textConfirmation').innerText = `User deleted!`;
      Users();
      return;
    } else {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Error, try again!`;
      UserProfile(user_id);
    }
  } catch (error) {
    console.error('Error deleted', error);
  } finally {
    hideLoader();
  }
};

const UserProfile = (user_id, name) => {
  document.querySelector('.mainSection').innerHTML = template(name);
  getUserProfile(user_id);
  updateButtonUser(user_id, name);
  deleteButtonAdmin(user_id);
};

export default UserProfile;
