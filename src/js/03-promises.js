import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);


function onSubmit(evt) {
  evt.preventDefault();
  const delayInput = Number(evt.target[0].value);
  const stepInput = Number(evt.target[1].value);
  const amountInput = Number(evt.target[2].value);

  let delay = delayInput;

  for (let position = 1; position <= amountInput; position += 1) {
    
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    
    delay += stepInput;
  }
} 

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({position, delay});
      } else {
        rej({position, delay});
      }
    }, delay) 
  })
}