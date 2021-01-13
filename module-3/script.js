/*
  Есть массив logins с логинами пользователей. Напишите скрипт добавления логина в массив logins.
  
  Добавляемый логин должен:
    - проходить проверку на длину, от 4 до 16-ти символов включительно
    - быть уникален, тоесть еще не используется в массиве logins
 
  🔔 Разбейте задачу на подзадачи, что удобно решить используя функции.
  
  Для начала напишите функцию checkLoginValidity(login) которая получает логин как 
  аргумент, проверяет количество символов логина и возвращает true если логин подходит 
  под условие длины от 4-х до 16-ти символов включительно, и false если не подходит. 
  Убедитесь что функция работает верно.
 
  Далее создайте функцию checkIfLoginExists(logins, login), которая получает логин и список 
  всех логинов как аргументы, проверяет наличие логина в массиве logins, возвращая false 
  если такого логина в массиве еще нет, и true если есть. Убедитесь что функция работает верно.
  Далее напишите функцию addLogin(logins, login) которая:
    - Получает новый логин и массив всех логинов как аргументы
    
    - Проверяет валидность логина используя вспомогательную функцию checkLoginValidity
      
    - Если логин не валиден, прекратить исполнение функции addLogin 
      и вернуть строку 'Ошибка! Логин должен быть от 4 до 16 символов'
      
    - Если логин валиден, функция addLogin проверяеть уникальность логина 
      с помощью функции checkIfLoginExists
       
    - Если checkIfLoginExists вернет false, addLogin добавляет новый логин 
       в logins и возвращает строку 'Логин успешно добавлен!'
       
    - Если checkIfLoginExists вернет true, тогда addLogin не добавляет 
       логин в массив и возвращает строку 'Такой логин уже используется!'
       
  🔔 Принцип единственной ответственности функции:
      - checkIfLoginExists только проверяет есть ли такой логин и возвращает true или false. 
        Больше ничего не делает.
      
      - checkLoginValidity только проверяет  валидный ли логин и возвращает true или false. 
        Больше ничего не делает.
      
      - addLogin вызывает обе функции и по результату их работы или добавляет логин в logins или нет, 
        возвращая указанные строки. Больше ничего не делает.
*/


const logins = ['mango', 'poly', 'ajax'];

function checkLoginValidity(login) {
    let result = false;

    if(login.length >= 4 && login.length <= 16 ) {
        result = true;
    }

    return result;
}

function checkIfLoginExists(logins, login) {
    let result = false;

    if(logins.includes(login)) {
        result = true;
    }

    return result;
}

function addLogin(logins, login) {
    let result;

    if(!checkLoginValidity(login)) {

        result = 'Ошибка! Логин должен быть от 4 до 16 символов';

    } else {

        if(!checkIfLoginExists(logins, login)) {
            logins.push(login);

            result = 'Логин успешно добавлен!';
        } else {

            result = 'Такой логин уже используется!';

        }
    }

    return result;
}

console.log(addLogin(logins, 'poly'));
console.log(logins);

console.log(addLogin(logins, 'polysiana'));
console.log(logins);

console.log(addLogin(logins, 'viv'));
console.log(logins);

console.log('script done');

