import './events.css';
import Event from '../event/Event';
import { fetchFunction } from '../../utils/fetchFunction';
import { displayLoader, hideLoader } from '../../components/loader/loader';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import { selectFilter } from '../../components/selectfilter/selectfilter';
import Register from '../register/Register';

const template = () => `
<article id="events">
${
  localStorage.getItem('user')
    ? `<h3>Hi ${JSON.parse(localStorage.getItem('user')).user.userName}</h3>`
    : `<h3>Welcome Guest</h3>`
}
<div class="selectOrder">
</div>
<ul id="eventsContainer"></ul>
</article>
`;

const getEvents = async (inputValue) => {
  displayLoader();
  try {
    const eventData = await fetchFunction('events', 'Get');
    const events = await eventData.json();
    const eventContainer = document.querySelector('#eventsContainer');
    let orderlyEvents = events;

    if (inputValue === '') {
      orderlyEvents = events;
      eventContainer.innerHTML = '';
    } else if (inputValue === 'Next Date') {
      orderlyEvents = events
        .slice()
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      eventContainer.innerHTML = '';
    } else if (inputValue === 'A - Z') {
      orderlyEvents = events.slice().sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      eventContainer.innerHTML = '';
    }

    for (const event of orderlyEvents) {
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

const handleSelect = (event) => {
  const inputValue = document.querySelector('#order_by').value;
  console.log(inputValue);
  getEvents(inputValue);
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

const Events = () => {
  document.querySelector('.mainSection').innerHTML = template();
  getEvents();
  selectFilter();
  document.querySelector('.optionThree').remove();
  if (document.querySelector('#order_by')) {
    document
      .querySelector('#order_by')
      .addEventListener('change', handleSelect);
  }
};

export default Events;
