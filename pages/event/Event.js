import { displayLoader, hideLoader } from '../../components/loader/loader';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';
import { fetchFunction, fetchFunctionContent } from '../../utils/fetchFunction';
import Events from '../events/Events';
import UpdateEvent from '../updateEvent/updateEvent';
import { deleteUserEvent } from '../userprofile/UserProfile';
import './event.css';

const template = () => `
<article id="event">
<div id="eventContainer">
<h3>Hi ${
  JSON.parse(localStorage.getItem('user')).user.userName
}, the Event details are:</h3>
<div id="eventInfoContainer"></div>
<div id="attendeeOption">

  </div>
<div id="btnsContainer" class="btnsContainer">

</div>
</div>
</article>
`;

const getEvent = async (eventId) => {
  displayLoader();
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const eventData = await fetchFunctionContent(
      `events/${eventId}`,
      'Get',
      `Bearer ${token}`
    );
    const event = await eventData.json();
    const eventContainer = document.querySelector('#eventInfoContainer');
    const divImg = document.createElement('div');
    divImg.className = 'imgContainer';
    const divEventDetails = document.createElement('div');
    divEventDetails.className = 'eventDetailsContainer';
    const divEventAsis = document.createElement('div');
    divEventAsis.className = 'eventAsisContainer';
    const divEventAsisTitle = document.createElement('div');
    divEventAsisTitle.className = 'eventAsisTitle';
    const divAsisContainer = document.createElement('div');
    divAsisContainer.className = 'asisContainer';
    const date = new Date(event.date).toLocaleDateString();
    divImg.innerHTML = `
    <div class="clipped-borderMax">
  <img src=${event.imageEvent} alt=${event.title} class="imgEventMax"/>
  </div>
  `;
    divEventDetails.innerHTML = `
  <h3>${event.title}</h3>
  <h4>${date}</h4>
  <h4>${event.location}</h4>
  <h5>${event.description}</h5>
  `;
    divEventAsisTitle.innerHTML = `
      <h3>The attendees will be:</h3>
  `;
    divEventAsis.appendChild(divEventAsisTitle);
    divEventAsis.appendChild(divAsisContainer);
    eventContainer.appendChild(divImg);
    eventContainer.appendChild(divEventDetails);
    eventContainer.appendChild(divEventAsis);
    for (let i = 0; i < event.asis.length; i++) {
      getAsis(event.asis[i]);
    }
    const attendeeOptions = document.querySelector('#attendeeOption');
    attendeeOptions.innerHTML = `
    ${
      event.asis.includes(JSON.parse(localStorage.getItem('user')).user._id)
        ? `<h4>You are attendee in this Event</h4>
        <div class="btnsContainer">
        <button id="leaveEventbtn" class="infoBtn">Go Out?</button>
    </div>`
        : `<h4>Are you interested? Join us!</h4>
    <div class="btnsContainer">
    <button id="attendeebtn" class="infoBtn">Yes</button>
    <button id="clearbtn" class="infoBtn">No</button>
    </div>`
    }
    `;
    if (document.querySelector('#attendeebtn')) {
      document.querySelector('#attendeebtn').addEventListener('click', () => {
        prompConfirmation();
        const cancelButtonEvent = document.createElement('div');
        cancelButtonEvent.className = 'cancelButton';
        const divConfirmation = document.querySelector('.divConfirmation');
        divConfirmation.appendChild(cancelButtonEvent);
        document.querySelector(
          '.textConfirmation'
        ).innerText = `Are You Sure to participe?`;
        document.querySelector('.confirmationButton').innerText = 'SURE!🤪';
        document.querySelector('.cancelButton').innerText = 'CANCEL';
        const prompConfirm = document.querySelector('.divPrompUser');
        const confirmButton = document.querySelector('.confirmationButton');
        confirmButton.addEventListener('click', () => {
          attendanceRegister(eventId);
          prompConfirm.remove();
        });
        const cancelButton = document.querySelector('.cancelButton');
        cancelButton.addEventListener('click', () => {
          prompConfirm.remove();
        });
      });
    }
    if (document.querySelector('#clearbtn')) {
      document.querySelector('#clearbtn').addEventListener('click', () => {
        Events();
      });
    }
    if (document.querySelector('#leaveEventbtn')) {
      const attende = JSON.parse(localStorage.getItem('user')).user._id;
      document.querySelector('#leaveEventbtn').addEventListener('click', () => {
        prompConfirmation();
        const stayButtonEvent = document.createElement('div');
        stayButtonEvent.className = 'stayButton';
        stayButtonEvent.classList.add('infoBtn');
        const divConfirmation = document.querySelector('.divConfirmation');
        divConfirmation.appendChild(stayButtonEvent);
        document.querySelector(
          '.textConfirmation'
        ).innerText = `Are You Sure to Leave this Event?😱`;
        document.querySelector('.confirmationButton').innerText = 'Yes..😞';
        document.querySelector('.stayButton').innerText = 'No!!!';
        const prompConfirm = document.querySelector('.divPrompUser');
        const confirmButton = document.querySelector('.confirmationButton');
        confirmButton.addEventListener('click', () => {
          deleteUserEvent(attende);
          deleteEventUser(eventId);
          prompConfirmation();
          document.querySelector(
            '.textConfirmation'
          ).innerText = `You are OUT of the Event!☠️`;
          Events();
          prompConfirm.remove();
        });
        const stayButton = document.querySelector('.stayButton');
        stayButton.addEventListener('click', () => {
          prompConfirm.remove();
        });
      });
    }
    if (
      JSON.parse(localStorage.getItem('user')).user.userName === event.author ||
      JSON.parse(localStorage.getItem('user')).user.role === 'admin'
    ) {
      const buttonsContainer = document.querySelector('#btnsContainer');
      const updateButton = document.createElement('button');
      updateButton.id = 'updateeventbtn';
      updateButton.className = 'infoBtn';
      updateButton.textContent = 'Update Event';
      buttonsContainer.appendChild(updateButton);
      document
        .querySelector('#updateeventbtn')
        .addEventListener('click', () => {
          UpdateEvent(eventId);
        });
    }
  } catch (error) {
    console.error('Unexpected Error', error);
  } finally {
    hideLoader();
  }
};

const getAsis = async (userId) => {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const assisData = await fetchFunctionContent(
      `auth/${userId}`,
      'Get',
      `Bearer ${token}`
    );
    const user = await assisData.json();
    const assisContainer = document.querySelector('.asisContainer');
    const liAsis = document.createElement('li');
    liAsis.innerHTML = `
    <img src=${user.imageAvatar} alt=${user.userName}/>
    <h5>${user.userName}</h5>
    `;
    assisContainer.appendChild(liAsis);
  } catch (error) {
    console.error('Error error', error);
  }
};

const attendanceRegister = async (eventId) => {
  try {
    const attende = JSON.parse(localStorage.getItem('user')).user._id;
    const token = JSON.parse(localStorage.getItem('user')).token;

    const data = await fetchFunctionContent(
      `auth/edit/${attende}`,
      'Put',
      `Bearer ${token}`,
      JSON.stringify({
        events: eventId
      })
    );

    const dataEvent = await fetchFunctionContent(
      `user/attendees/${eventId}`,
      'Put',
      `Bearer ${token}`,
      JSON.stringify({
        asis: attende
      })
    );

    if (dataEvent.status === 200) {
      prompConfirmation();
      document.querySelector('.textConfirmation').innerText = `You are IN!`;
      Event(eventId);
      return;
    } else if (dataEvent.status === 400) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Unexpected error`;
      Event(eventId);
    }
  } catch (error) {
    console.error('Unexpected error', error);
  }
};

const deleteButtonAdmin = (eventId) => {
  if (JSON.parse(localStorage.getItem('user')).user.role === 'admin') {
    const buttonsContainer = document.querySelector('.btnsContainer');
    const deleteButton = document.createElement('button');
    deleteButton.id = 'deleteeventbtn';
    deleteButton.className = 'infoBtn';
    deleteButton.textContent = 'Delete Event';
    buttonsContainer.appendChild(deleteButton);
    document.querySelector('#deleteeventbtn').addEventListener('click', () => {
      deleteEvent(eventId);
      deleteEventUser(eventId);
    });
  }
};

const deleteEventUser = async (eventId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const usersData = await fetchFunctionContent(
    'auth',
    'Get',
    `Bearer ${token}`
  );
  const users = await usersData.json();
  for (let user of users) {
    if (user.events.includes(eventId)) {
      const token = JSON.parse(localStorage.getItem('user')).token;
      const data = await fetchFunctionContent(
        `auth/remove/${user._id}`,
        'Put',
        `Bearer ${token}`,
        JSON.stringify({
          events: eventId
        })
      );
    }
  }
};

const deleteEvent = async (eventId) => {
  displayLoader();
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const eventDelete = await fetchFunction(
      `user/events/${eventId}`,
      'Delete',
      `Bearer ${token}`
    );
    if (eventDelete.status === 200) {
      prompConfirmation();
      document.querySelector('.textConfirmation').innerText = `Event deleted!`;
      Events();
      return;
    } else {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Error, try again!`;
      Event(eventId);
    }
  } catch (error) {
    console.error('Error deleted', error);
  } finally {
    hideLoader();
  }
};

const Event = (eventId) => {
  document.querySelector('.mainSection').innerHTML = template();
  getEvent(eventId);
  // document.querySelector('.updateeventbtn').addEventListener('click', () => {
  //   UpdateEvent(eventId);
  // });
  deleteButtonAdmin(eventId);
};

export default Event;
