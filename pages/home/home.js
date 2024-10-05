import './home.css';
import Event from '../event/Event';
import { fetchFunction } from '../../utils/fetchFunction';
import { displayLoader, hideLoader } from '../../components/loader/loader';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import { linkPages } from '../../utils/linkPages';
import Events from '../events/Events';
import Register from '../register/Register';

const template = () => `
<article id="mainEvents">
${
  localStorage.getItem('user')
    ? `<h3>Welcome ${
        JSON.parse(localStorage.getItem('user')).user.userName
      }</h3>`
    : `<h3>Welcome Guest</h3>`
}

<ul id="mainEventsContainer">
<h3 id="nextEvents" class="text">NEXT EVENTS</h3>
</ul>
<div id="moreEventsLink" class=" navLink"> 
<h5>More Events   👉</h5>
</div>
<div class="descriptionContainer">
<div id="mainDescription">
<p>EVENTSGATOR is one of the most popular sites about Events, you will find partys, concerts, sporting events, cultural events, beauty events and much much more.</p>
<p>Be part of EVENTSGATOR 😎</p>
</div>
</div>
</article>
`;

const getMainEvents = async () => {
  displayLoader();
  try {
    const eventData = await fetchFunction('events');
    const events = await eventData.json();
    const orderlyEvents = events
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const eventContainer = document.querySelector('#mainEventsContainer');
    for (let i = 0; i < 3; i++) {
      const event = orderlyEvents[i];
      const li = document.createElement('li');
      const date = new Date(event.date).toLocaleDateString();
      li.innerHTML = `
      <div class="moreInfobtn" id=${event._id}>
      <div class="clipped-border">
    <img src=${event.imageEvent} alt=${event.title} class="imgEvent"/>
    </div>
    <h3>${event.title}</h3>
    <h4>${event.location}</h4>
    <h4>${date}</h4>
    <button class="infoBtn">More Info</button>
    </div>
    `;
      eventContainer.appendChild(li);
    }
    const btnIds = document.querySelectorAll('.moreInfobtn');
    for (const btnId of btnIds)
      btnId.addEventListener('click', () => {
        eventMoreInfo(btnId.id);
      });
  } catch (error) {
    console.error('Unexpected Error', error);
  } finally {
    hideLoader();
  }
};

const eventMoreInfo = async (eventId) => {
  if (localStorage.getItem('user')) {
    Event(eventId);
  } else {
    prompConfirmation();
    document.querySelector(
      '.textConfirmation'
    ).innerText = `You must login or register for more Info! 🤪`;
    document.querySelector('.confirmationButton').innerText = 'Register';
    document
      .querySelector('.confirmationButton')
      .addEventListener('click', () => {
        Register();
      });
    return;
  }
};

const Home = () => {
  document.querySelector('.mainSection').innerHTML = template();
  getMainEvents();
  linkPages('#moreEventsLink', Events);
  linkPages('#mainDescription', Register);
};

export default Home;
