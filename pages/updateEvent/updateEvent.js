import Events from '../events/Events';
import Event from '../event/Event';
import './updateevent.css';
import { fetchFunction } from '../../utils/fetchFunction';
import { displayLoader, hideLoader } from '../../components/loader/loader';
import { prompConfirmation } from '../../components/prompConfirmAttendance/prompConfirmation';

const template = () => {
  return `
  <article id="updateEvent">
  <div id="updateEventContainer">
  ${
    localStorage.getItem('user')
      ? ` <h2>Enter the data for update the Event</h2>
      <form class="updateEventForm" id="updateEventForm">
      <div class="labelContainer">
      <label for="upeventname">Title:</label>
      <input type="text" placeholder="Title" id="upeventname"/></div>
      <div class="labelContainer">
      <label for="upeventlocation">Location:</label>
      <input type="text" placeholder="Location" id="upeventlocation"/></div>
      <div class="labelContainer">
      <label for="upeventdate">Date:</label>
      <input type="date" placeholder="Date" id="upeventdate"/></div>
      <div class="labelContainer">
      <label for="upeventdescription">Description:</label>
      <textarea placeholder="Description" id="upeventdescription" rows="5"></textarea></div>
      <div class="labelContainer imgEv">
      <label for="upimageevent">Image:</label>
      <input type="file" placeholder="Image" id="upimageevent" accept="image/*"/></div>
      <div class="buttonsContainer2">
      <button id="updateeventbtn" class="infoBtn">Update</button>
      <button id="cancelbtn" class="infoBtn">Cancel</button></div>
    </form>`
      : `<h2>Error</h2>`
  }
  </div>
  </article>
  `;
};

const updateEventSubmit = async (eventId) => {
  displayLoader();
  try {
    const title = document.querySelector('#upeventname').value;
    const location = document.querySelector('#upeventlocation').value;
    const date = document.querySelector('#upeventdate').value;
    const description = document.querySelector('#upeventdescription').value;
    const imageevent = document.querySelector('#upimageevent').files[0];
    const asis = [];

    let formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('imageEvent', imageevent);
    formData.append('asis', asis);

    const token = JSON.parse(localStorage.getItem('user')).token;
    const data = await fetchFunction(
      `user/attendees/${eventId}`,
      'Put',
      `Bearer ${token}`,
      formData
    );

    if (data.status === 200) {
      prompConfirmation();
      document.querySelector('.textConfirmation').innerText = `Event updated!`;
      Event(eventId);
      return;
    } else if (data.status === 400) {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Unexpected error`;
      Events();
    }
  } catch (error) {
    console.error('Unexpected error', error);
  } finally {
    hideLoader();
  }
};

const UpdateEvent = (eventId) => {
  document.querySelector('.mainSection').innerHTML = template();
  document.querySelector('#updateeventbtn').addEventListener('click', () => {
    if (
      document.querySelector('#upeventname').value &&
      document.querySelector('#upeventlocation').value &&
      document.querySelector('#upeventdate').value &&
      document.querySelector('#upeventdescription').value &&
      document.querySelector('#upimageevent').files[0]
    ) {
      updateEventSubmit(eventId);
    } else {
      prompConfirmation();
      document.querySelector(
        '.textConfirmation'
      ).innerText = `Faillure!! You must complete all the fields!`;
      document.querySelector('#updateEventForm').reset();
    }
  });
  document.querySelector('#cancelbtn').addEventListener('click', () => {
    document.querySelector('#updateEventForm').reset();
    Events();
  });
};

export default UpdateEvent;
