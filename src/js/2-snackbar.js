// Підключаємо CSS код бібліотеки в проєкт
// Додатковий імпорт стилів
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import svg from '../img/pngegg.png';

document.addEventListener('DOMContentLoaded', () => {
  // Отримання форми
  const form = document.querySelector('.form');

  // Додавання слухача подій до форми
  form.addEventListener('submit', event => {
    event.preventDefault(); // Заборона стандартної поведінки форми

    // Отримання елементів форми

    const delayInput = form.querySelector('input[name="delay"]');
    const stateInputs = form.querySelectorAll('input[name="state"]');
    const selectedState = [...stateInputs].find(input => input.checked);

    if (delayInput && selectedState) {
      // Отримання значень з полів форми
      const delay = parseInt(delayInput.value, 10);

      // Створення промісу
      const notificationPromise = new Promise((resolve, reject) => {
        // Встановлення затримки для виклику промісу
        setTimeout(() => {
          if (selectedState.value === 'fulfilled') {
            // Виклик resolve при вдалому виконанні промісу
            resolve(delay);
          } else {
            // Виклик reject при відхиленні промісу
            reject(delay);
          }
        }, delay);
      });

      // Обробка результатів промісу
      notificationPromise
        .then(delay => {
          iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topCenter',
            timeout: 2000,
            backgroundColor: '#59a10d',
            messageColor: '#fff',
          });
        })
        .catch(delay => {
          iziToast.show({
            message: `❎ Rejected promise in ${delay}ms`,
            position: 'topCenter',
            timeout: 2000,
            backgroundColor: '#ef4040',
            messageColor: '#fff',
          });
        });
    }
  });
});
