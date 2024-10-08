import Events from '../events/Events';
import './createevent.css';
import { fetchFunction } from '../../utils/fetchFunction';
import { displayLoader, hideLoader } from '../../components/loader/loader';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';

const template = () => {
  return `
  <article id="createEvent">
  <div id="createEventContainer">
  ${
    localStorage.getItem('user')
      ? ` <h2>Create the new Event</h2>
      <form class="newEventForm" id="newEventForm">
      <div class="labelContainer">
      <label for="eventname">Title:</label>
      <input type="text" placeholder="Title" id="eventname"/></div>
      <div class="labelContainer">
      <label for="eventlocation">Location:</label>
      <input type="text" placeholder="Location" id="eventlocation"/></div>
      <div class="labelContainer">
      <label for="eventdate">Date:</label>
      <input type="date" placeholder="Date" id="eventdate"/></div>
      <div class="labelContainer">
      <label for="eventdescription">Description:</label>
      <textarea placeholder="Description" id="eventdescription" rows="5"></textarea></div>
      <div class="labelContainer imgEv">
      <label for="imageevent">Image:</label>
      <input type="file" placeholder="Image" id="imageevent" accept="image/*"/></div>
      <div class="buttonsContainer2">
      <button id="createbtn" class="infoBtn">Create</button>
      <button id="cancelbtn" class="infoBtn">Cancel</button></div>
    </form>`
      : `<h2>Error</h2>`
  }
  </div>
  </article>
  `;
};

const createEventSubmit = async () => {
  displayLoader();
  try {
    const author = JSON.parse(localStorage.getItem('user')).user.userName;
    const title = document.querySelector('#eventname').value;
    const location = document.querySelector('#eventlocation').value;
    const date = document.querySelector('#eventdate').value;
    const description = document.querySelector('#eventdescription').value;
    const imageevent = document.querySelector('#imageevent').files[0];

    let formData = new FormData();
    formData.append('author', author);
    formData.append('title', title);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('imageEvent', imageevent);

    const token = JSON.parse(localStorage.getItem('user')).token;
    const data = await fetchFunction('user/events', {
      method: 'Post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if (data.status === 200) {
      prompConfirmation();
      document.querySelector('.textConfirmation').innerText = `Event created!`;
      Events();
      return;
    } else if (data.status === 400) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Unexpected error`;
      CreateEvent();
    }
  } catch (error) {
    console.error('Unexpected error', error);
  } finally {
    hideLoader();
  }
};

const CreateEvent = () => {
  document.querySelector('.mainSection').innerHTML = template();
  if (document.querySelector('#createbtn')) {
    document.querySelector('#createbtn').addEventListener('click', () => {
      createEventSubmit();
    });
  }
  if (document.querySelector('#cancelbtn')) {
    document.querySelector('#cancelbtn').addEventListener('click', () => {
      document.querySelector('#newEventForm').reset();
      Events();
    });
  }
};

export default CreateEvent;
