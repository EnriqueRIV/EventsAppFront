import './style.css';
import { printHeaderTemplate as Header } from './components/header/header';
import { printFooterTemplate as Footer } from './components/footer/footer';
import Events from './pages/events/Events';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { linkPages } from './utils/linkPages';
import Loader from './components/loader/loader';
import Home from './pages/home/home';

Header();
Loader();
Home();
Footer();

linkPages('#homelink', Home);
linkPages('#eventslink', Events);
linkPages('#registerlink', Register);
linkPages('#loginlink', Login);
