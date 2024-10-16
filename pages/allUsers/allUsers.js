import { displayLoader, hideLoader } from '../../components/loader/loader';
import { fetchFunctionContent } from '../../utils/fetchFunction';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import UserProfile from '../userprofile/UserProfile';
import './allUsers.css';
import { selectFilter } from '../../components/selectfilter/selectfilter';

const template = () => `
<article id="users">
<div class="selectOrder">
</div>
<ul id="usersContainer"></ul>
</article>
`;

const getUsers = async (inputValue) => {
  displayLoader();
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const userData = await fetchFunctionContent(
      'auth',
      `Get`,
      `Bearer ${token}`
    );
    const users = await userData.json();
    const userContainer = document.querySelector('#usersContainer');
    let orderlyUsers = users;

    if (inputValue === '') {
      orderlyUsers = users;
      userContainer.innerHTML = '';
    } else if (inputValue === 'A - Z username') {
      orderlyUsers = users.slice().sort((a, b) => {
        if (a.userName.toLowerCase() < b.userName.toLowerCase()) {
          return -1;
        }
        if (a.userName.toLowerCase() > b.userName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      userContainer.innerHTML = '';
    }
    for (const user of orderlyUsers) {
      if (user._id !== JSON.parse(localStorage.getItem('user')).user._id) {
        const li = document.createElement('li');
        li.innerHTML = `
      <div class="moreInfobtn">
    <img src=${user.imageAvatar} alt=${user.userName}/>
    <h3>Username: ${user.userName}</h3>
    <button class="infoBtn userBtn" id=${user._id} name=${user.userName}>More Info</button>
    </div>
    `;
        userContainer.appendChild(li);
      }
    }
    const btnIds = document.querySelectorAll('.userBtn');
    for (const btnId of btnIds)
      btnId.addEventListener('click', () => {
        userMoreInfo(btnId.id, btnId.name);
      });
  } catch (error) {
    console.error('Unexpected Error', error);
  } finally {
    hideLoader();
  }
};

const userMoreInfo = async (userId, name) => {
  if (JSON.parse(localStorage.getItem('user')).user.role === 'admin') {
    UserProfile(userId, name);
  } else {
    prompConfirmation();
    document.querySelector(
      '.textConfirmation'
    ).innerText = `Sorry, you must be Administrator for more details! 🧐`;
    return;
  }
};

const handleSelect = (event) => {
  const inputValue = document.querySelector('#order_by').value;
  getUsers(inputValue);
};

const Users = () => {
  document.querySelector('.mainSection').innerHTML = template();
  getUsers();
  selectFilter();
  document.querySelector('.optionOne').remove();
  document.querySelector('.optionTwo').remove();
  document.querySelector('#order_by').addEventListener('change', handleSelect);
};

export default Users;
