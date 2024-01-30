// Підключаємо CSS код бібліотеки в проєкт
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myInput = document.getElementById('datetime-picker');
// const startBtn = document.getElementById('start-btn');

let userSelectedDate;
let timerInterval;

// Ініціалізація бібліотеки (вставка коду ф-ції бібліотеки в наш код js)
// 1й аргумент ф-ції - це id елемента, на якому ініціалізується бібліотека
// 2й аргумент ф-ції - об'єкт параметрів Options з документації для формування
// певного способу відображення на сторінці з додаванням if для викоання певної задачі
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    const startBtn = document.getElementById('start-btn');

    if (selectedDate < currentDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topCenter',
        messageSize: '16px',
        timeout: 3000,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
      // // Виклик функції оновлення таймера
      // updateTimer();
      // // Запуск таймера кожну секунду
      // timerInterval = setInterval(updateTimer, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  userSelectedDate = new Date(myInput.value);
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
});

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
}

function displayTimer({ days, hours, minutes, seconds }) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = formatTimeValue(days);
  hoursElement.textContent = formatTimeValue(hours);
  minutesElement.textContent = formatTimeValue(minutes);
  secondsElement.textContent = formatTimeValue(seconds);
}

function updateTimer() {
  const currentTime = new Date();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    // Зупинка таймера, якщо час вичерпано
    clearInterval(timerInterval);
    displayTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  } else {
    const timeValues = convertMs(timeDifference);
    displayTimer(timeValues);
  }
}

function formatTimeValue(value) {
  return value < 10 ? `0${value}` : value;
}

// // ф-ція, яка додає ведучий нуль до чисел, що складаються з однієї цифри:
// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }
