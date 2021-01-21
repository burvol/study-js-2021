'use strict';

/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const API_URL = 'https://jsonplaceholder.typicode.com';

//- функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
function getAllUsers() {
    removeUser(1);

    fetch(`${API_URL}/todos/`)
        .then( resolved => {
            if(!resolved.ok) return

            return resolved.json();
        }
        )
        .then(data => console.log(data))
        .catch(err => console.log(err));


    }
// console.log(getAllUsers());

// - функция getUserById(id) - должна вернуть пользователя с переданным id.
function getUserById(id) {
    fetch(`${API_URL}/todos/${id}`)
        .then( resolved => {
            if(!resolved.ok) return

            return resolved.json();
        }
        )
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

// console.log(getUserById(1));

// - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
function addUser({title}) {
    fetch(`${API_URL}/posts`, 
        {
            method: 'POST',
            body: JSON.stringify({title}), 
            headers: {
                        'Content-Type': 'application/json'
                    }
        }   
        )
        .then(resolved => resolved.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

// console.log(addUser({
//     title: 'vovik',
// }))

// - функция removeUser(id) - должна удалять из БД юзера по указанному id.
function removeUser(id) {
    fetch(`${API_URL}/posts/${id}`, {method: 'DELETE'})
    .then(resolved => resolved.json())
    .then(data => console.log(data))
    .catch(err => console.log(err)); 
}

removeUser(1);

setTimeout(() => {
    getUserById(1);
}, 3000);

// console.log('getAllUsers(): ', getAllUsers());