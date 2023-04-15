import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', onBtnStartClick);

btnStart.setAttribute('disabled', 'active');

let selDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

      const selTime = selectedDates[0];
      const currTime = options.defaultDate;

      if (selTime < currTime) {
        Notify.failure('Please choose a date in the future');
      } else {
        btnStart.removeAttribute('disabled');
        selDate = selectedDates[0];
      }
    },
  };

  flatpickr("#datetime-picker", options);


function onBtnStartClick () {
    const date = new Date();
    if (selDate > date) {
        btnStart.setAttribute('disabled', 'active');
        const diffTime = selDate.getTime() - date.getTime();
        const diffDate = convertMs(diffTime);
        updateTimer(diffDate);
        
        const intervalId = setInterval (() => {
        const date = new Date();
        const diffTime = selDate.getTime() - date.getTime();
        const diffDate = convertMs(diffTime);
        updateTimer(diffDate);

        if (diffTime < 1000) {
            clearInterval(intervalId);
            Notify.success('Countdown is over. Choose a new date');
        }
        }, 1000);
    } else {
        Notify.failure('Please choose a date in the future');
    }
}

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

  function addLeadingZero(value) {
    return value.padStart(2, '0')
  };

  function updateTimer ({ days, hours, minutes, seconds }) {
    daysTimer.textContent = addLeadingZero(`${days}`);
    hoursTimer.textContent = addLeadingZero(`${hours}`);
    minutesTimer.textContent = addLeadingZero(`${minutes}`);
    secondsTimer.textContent = addLeadingZero(`${seconds}`);
  }