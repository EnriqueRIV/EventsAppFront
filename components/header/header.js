import UserNavBar from '../usernavbar/UserNavBar';
import './header.css';

const headerTemplate = () => `
<nav class="navBar">
<ul>
  <li><a href="#" class="navLink" id="homelink" alt="Inicio" title="Home"><img src="https://res.cloudinary.com/dkwfauuct/image/upload/v1727223235/Proyecto10/gatorparty_ctobyf.jpg" alt="logoEventgator" id="logoEventgator"><h1 class="titleH1">EVENTSGATOR</h1><span class="material-symbols-outlined navLinkMobile">home</span></a></li>
  <li><a href="#" class="navLink" id="eventslink" alt="Events" title="Events"><p>Events</p><span class="material-symbols-outlined navLinkMobile">festival</span></a></li>

  ${
    !localStorage.getItem('user')
      ? `<li id="registerLi" class="display"><a href="#" class="navLink" id="registerlink" alt="Register" title="Register"><p>Register</p><span class="material-symbols-outlined navLinkMobile">how_to_reg</span></a></li>
      <li id="loginLi" class="display"><a href="#" class="navLink" id="loginlink" alt="Login" title="Login"><p>Login</p><span class="material-symbols-outlined navLinkMobile">login</span></a></li>
      <li id="userOptions">
      </li>`
      : `<li id="registerLi"><a href="#" class="navLink" id="registerlink" alt="Register" title="Register"><p>Register</p><span class="material-symbols-outlined navLinkMobile">how_to_reg</span></a></li>
      <li id="loginLi"><a href="#" class="navLink" id="loginlink" alt="Login" title="Login"><p>Login</p><span class="material-symbols-outlined navLinkMobile">login</span></a></li>
      <li id="userOptions" class="display">
      </li>`
  }

</ul>
</nav>
`;

export const printHeaderTemplate = () => {
  document.querySelector('header').innerHTML = headerTemplate();
  if (document.querySelector('#userOptions.display')) {
    UserNavBar();
  }
};
