'use strict';

/*
  Написать следующий скрипт:
  
    - При загрузке страницы пользователю предлагается ввести через prompt число. 
      Число введенное пользователем записывается в массив чисел.
      
    - Операция ввода числа пользователем и сохранение в массив продолжается до
      тех пор, пока пользователь не нажмет Cancel в prompt. Используйте цикл do...while.
      
    - После того как пользователь прекратил ввод нажав Cancel, необходимо взять 
      массив введенных чисел, сложить общую сумму всех элементов массива и 
      записать ее в переменную. Используйте цикл for...of.
      
    - По окончанию ввода, если массив не пустой, вывести alert с текстом `Общая сумма чисел равна ${сумма}`
      
  🔔 PS: Делать проверку того, что пользователь ввел именно число, а не произвольный набор 
      символов, не обязательно. Если хотите, в случае некорректного ввода покажите alert с текстом 
      'Было введено не число, попробуйте еще раз', при этом результат prompt записывать 
      в массив чисел не нужно, после чего снова пользователю предлагается ввести число в prompt.
*/

const numbers = [];
let indicator = true;

// do{

//     const inputUser = prompt('введите число');

//     if(!inputUser) {
//         indicator = false;
//     }

//     const inputUserNumber = Number(inputUser);

//     if(inputUserNumber) {
//         numbers.push(inputUserNumber);
//     }

//     console.log('numbers in do ... while: ', numbers);

// } while(indicator);

// console.log('numbers global: ', numbers);

// let numbersSum = 0;

// for(const number of numbers) {
//     numbersSum += number;
// }

// console.log('numbersSum: ', numbersSum);

//===================================================================================
/*Напишите скрипт авторизации пользователя.
  
  Есть массив паролей зарегистрированных пользователей passwords. 
  
  При посещении страницы, необходимо попросить пользователя ввести свой пароль,
  после чего проверить содержит ли массив passwords пароль введенный пользователем.
  
  Пароль можно ввести не верно всего n раз, кол-во хранится в переменной attempts.
  Подсказка: используйте цикл do...while.
  Если был введен пароль который есть в массиве passwords, вывести alert 
  с текстом 'Добро пожаловать!' и прекратить спрашивать пароль в цикле.
  Если был введен не существующий пароль, отнять от лимита попыток единицу, 
  вывести alert с текстом "Неверный пароль, у вас осталось n попыток", 
  где n это оставшийся лимит. 
  
  После того как пользователь закрыл alert, запросить пароль снова. 
  Продолжать запрашивать пароль до тех пор, пока пользователь не введет 
  существующий пароль, не кончатся попытки или пока пользователь 
  не нажмет Cancel в prompt.
  Если закончились попытки, вывести alert с текстом "У вас закончились попытки, аккаунт заблокирован!"
  
  Если пользователь нажмет Cancel, прекратить выполнение цикла.
*/

const passwords = ['mango', 'poly', 'ajax'];
let attempts = 3;

const form = document.querySelector('form');
const formInput = form.querySelector('input');
const title = form.querySelector('h2');


form.addEventListener('submit', handleUserInputSubmit);

function handleUserInputSubmit(e) {
    e.preventDefault();

    const formInputValue = formInput.value;

    if(formInputValue === '') {
        alert('Ви ввели пусту строку. Введіть пароль!');
    } else if(passwords.includes(formInputValue)) {
        alert('Добро пожаловать!');
    } else if(!passwords.includes(formInputValue)) {
        attempts -=1;
        alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
    } 

    if(attempts === 0) {
        title.textContent = 'У вас закончились попытки, аккаунт заблокирован!';
    }

    form.reset();
}


// do{
//     const inputUserPassword = prompt('введите свой пароль');

//     console.log(inputUserPassword);

//     if(!inputUserPassword) {
//         break;
//     }

//     if(passwords.includes(inputUserPassword)) {

//         alert('Добро пожаловать!');

//         break;
//     }

//     attempts -= 1;

//     alert(`Неверный пароль, у вас осталось ${attempts} попыток`);

//     // Если закончились попытки, вывести alert с текстом "У вас закончились попытки, аккаунт заблокирован!"

//     if(attempts === 0) {
//         alert("У вас закончились попытки, аккаунт заблокирован!");
//     }

// } while(attempts)
