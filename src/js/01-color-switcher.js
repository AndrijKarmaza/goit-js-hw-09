const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

btnStop.setAttribute('disabled', 'active');
let intervalId;

function onBtnStartClick() {

btnStop.removeAttribute('disabled');
btnStart.setAttribute('disabled', 'active');
body.style.backgroundColor = `${getRandomHexColor()}`;

intervalId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
}, 1000);
};

function onBtnStopClick() {

btnStart.removeAttribute('disabled');
btnStop.setAttribute('disabled', 'active');
clearInterval(intervalId);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };