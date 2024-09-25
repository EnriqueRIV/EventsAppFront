import { linkPages } from '../../utils/linkPages';
import { logout } from '../../utils/logout';
import UpdateUser from '../../pages/updateUser/updateUser';
import './usernavbar.css';
import UserProfile from '../../pages/userprofile/UserProfile';
import CreateEvent from '../../pages/createEvent/createEvent';
import Users from '../../pages/allUsers/allUsers';

const template = () => `
<div class="userNavContainer">
<div class="userContainer">
<a href="#" class="navLink" id="userlink" alt="users" title="User">
  ${
    localStorage.getItem('user')
      ? `<h3> <img src=${
          JSON.parse(localStorage.getItem('user')).user.imageAvatar
        } alt=${JSON.parse(localStorage.getItem('user')).user.firstname}/> ${
          JSON.parse(localStorage.getItem('user')).user.userName
        }</h3>`
      : `<h3>Guest</h3>`
  }
  
<div class="hamburguer">
  <div class="_layer -top"></div>
  <div class="_layer -mid"></div>
  <div class="_layer -bottom"></div>
</div></a>
</div>
<nav class="menuppal">
  <ul>
    <li id="showProfile"><a href="#" >View Profile</a></li>
    <li id="updateProfile"><a href="#" >Update Profile</a></li>
    <li id="allUsers"><a href="#" >All Users</a></li>
    <li id="newEvent"><a href="#" id="newEvent">New Event</a></li>
    <li id="logoutuser"><a href="#" >Logout</a></li>
  </ul>
</nav>
</div>
`;

function toggleMenu() {
  this.classList.toggle('is-active');
  document.querySelector('.menuppal').classList.toggle('is_active');
}

const UserNavBar = () => {
  document.querySelector('#userOptions').innerHTML = template();
  linkPages('#updateProfile', UpdateUser);
  linkPages('#showProfile', UserProfile);
  linkPages('#allUsers', Users);
  linkPages('#newEvent', CreateEvent);
  logout('#logoutuser');
  const menu = document.querySelector('.userNavContainer');
  menu.addEventListener('click', toggleMenu, true);
};

export default UserNavBar;
