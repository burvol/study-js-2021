'use strict';

/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/


/**
 * 1. При нажатии на старт запускать таймер
 * 2. при нажатии на стоп останавливать таймер
 * 3. нужен обект для хранения полей и методов таймера
 * 4. метод start, stop и поле timerId
 * 5. xx:xx.x
 */
//========================================================================
// - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
//     меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
//     а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
//     со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
//     с 6 секунд, а не с 16. 

const buttonStart = document.querySelector('button.js-start');
const clockFace = document.querySelector('p.js-time');

buttonStart.addEventListener('click', startTimer)


let timerId = null;
const date = Date.now();
let isActiveStart = false;
let isActivePause = false;

function startTimer() {
    if(!isActiveStart) {
        timerId = setInterval(() => {
            const deltaTime = Date.now() - date;
    
            const minutes = Number.parseInt((deltaTime / 1000) / 60);
            const seconds = Number.parseInt((deltaTime / 1000));
            const milisicunds = Number.parseInt((deltaTime / 100));
            
            updateClockFace(`${minutes}:${seconds}:${milisicunds}`);
    
        }, 100);

        isActiveStart = true;
        buttonStart.textContent = 'Pause';
    } 
    else if(isActivePause) {
        buttonStart.textContent = 'Pause';

    }
     else {
        clearInterval(timerId);
        buttonStart.textContent = 'Continue';
        isActivePause = false;
        isActiveStart = false;
    }    
}

function updateClockFace(value) {
    clockFace.textContent = value;
}
