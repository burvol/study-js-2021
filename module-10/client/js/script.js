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
const state = {
    selectedId: null,
}

const api = {
    baseUrl: 'http://localhost:3000/notes/',
    getAllUsers() {
        return fetch(this.baseUrl)
        .then(response => {
            if(response.ok) return response.json();

            throw new Error('Error while fetching' + response.statusText);
        })
        .catch(err => console.log(err));
    },
    getUserById(id) {
        return fetch(`${this.baseUrl}${id}`,{
            method: 'GET',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        .then(response => {
            if(response.ok) return response.json();

            throw new Error('Error while fetching' + response.statusText);
        })
            .catch(err => console.log(err));
    },
    addUser({name, age}) {
        return fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify({name, age}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if(response.ok) return response.json();

            throw new Error('Error while fetching' + response.statusText);
        })
            .catch(err => console.log(err));
    },
    removeUser(id) {
        return fetch(`${this.baseUrl}${id}`,{
            method: 'DELETE',
        })
        .then(response => {
            if(response.ok) return response.json();

            throw new Error('Error while fetching' + response.statusText);
        })
            .catch(err => console.log(err));
    },
    updateUser({name, id, age}) {
        return fetch(`${this.baseUrl}${id}`, {
            method: 'PATCH',
            body: JSON.stringify({name, age}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if(response.ok) return response.json();

            throw new Error('Error while fetching' + response.statusText);
        })
            .catch(err => console.log(err));
    }
}

const refs = selectRefs();

refs.btnsBox.addEventListener('click', handleShowAllCardsClick);
refs.noteEditor.addEventListener('submit', handleAddUserForm);
refs.noteList.addEventListener('click', handleDeleteCardClick);
refs.modal.addEventListener('click', handleUpdateCardClick);
refs.searchForm.addEventListener('submit', handlerSearchIdSubmit);

function handleShowAllCardsClick({target}) {
    if(target.nodeName !== 'BUTTON') return;

    const action = target.dataset.action;

    switch(action) {
        case 'show':
            renderAllCards();
            break;
        case 'hide':
            removeAllCards();
            break;
        default:
            console.log('На цю кнопку не має оброботчіка');
    }
}

function renderAllCards() {
    removeAllCards();
    api.getAllUsers()
        .then(cards => {
            const markup = cards.reduce((acc, card) => {
                return acc + createNoteMarkup(card);
            }, '');
            
            refs.noteList.insertAdjacentHTML('afterbegin', markup);
        })
}

function removeAllCards() {
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => note.remove());
}

function handleAddUserForm(e) {
    e.preventDefault();

    const name = refs.noteEditorInputName.value; 
    const age = refs.noteEditorInputAge.value   

    if(name === '' || age === '') return alert('Не залишайте пусту строку!!!');

    api.addUser({name, age})
        .then(card => {
            const markup = createNoteMarkup(card);

            refs.noteList.insertAdjacentHTML('beforeend', markup);
        });
    
    refs.noteEditor.reset();
}

function handleDeleteCardClick({target}) {
    if(target.nodeName !== 'BUTTON') return;

    const action = target.dataset.action;

    switch(action) {
        case 'delete':
            deleteCardUser(target);
            break;
        case 'edit':
            updeteCardUser(target);
            break;
        default:
            console.log('Сдухача на цю кнопку не має');
    }
}

function deleteCardUser(target) {
    const card = target.closest('.note');
    const id = card.dataset.id;
    
    api.removeUser(id)
        .then(() => card.remove());
}

function updeteCardUser(target) {

    const card = target.closest('.note');
    state.selectedId = card.dataset.id;

    const cardValueName = card.querySelector('.name span').textContent;
    const cardValueAge = card.querySelector('.age span').textContent;

    refs.modalInputName.value = cardValueName;
    refs.modalInputAge.value = cardValueAge;

    modalToggle();
}

function handleUpdateCardClick({target}) {
    if(target.nodeName !== 'BUTTON') return;

    const action = target.dataset.action;

    switch(action) {
        case 'save':
            updeteCard();
            break;
        case 'close':
            modalToggle();
            break;
        default:
            console.log('Обрабнка цієї кнопки немає');
    }
}

function updeteCard() {
    const name = refs.modalInputName.value;
    const age = refs.modalInputAge.value;
    const id = state.selectedId;

    api.updateUser({id, name, age})
        .then(() =>{ 
            modalToggle();
            removeAllCards();
            renderAllCards();
        });

    console.log('Click save!!!');
}

function handlerSearchIdSubmit(e) {
    e.preventDefault();

    removeAllCards();

    const id = refs.searchFormInput.value;

    api.getUserById(id)
        .then(card => {
            const markup = createNoteMarkup(card);

            refs.noteList.insertAdjacentHTML('afterbegin', markup);
        });

    refs.searchForm.reset();
}

function createNoteMarkup({ id, name, age }) {
    return `
    <li class="note" data-id="${id}">
        <div class="actions">
            <button class="button" data-action="edit">Редактировать</button>
            <button class="button" data-action="delete">Удалить</button>
        </div>
        <p class="name">name: <span>${name}</span></p>
        <p class="age">age: <span> ${age}</span></p>
    </li>
    `;
}

function selectRefs() {
    const refs = {};

    refs.btnsBox = document.querySelector('.buttons-box');
    refs.noteEditor = document.querySelector('.note-editor');
    refs.noteEditorInputName = refs.noteEditor.querySelector('.input-name');
    refs.noteEditorInputAge = refs.noteEditor.querySelector('.input-age');
    refs.noteList = document.querySelector('.note-list');
    refs.modalBackdrop = document.querySelector('.backdrop');
    refs.modal = document.querySelector('.modal');
    refs.modalInputName = refs.modal.querySelector('.input-name');
    refs.modalInputAge = refs.modal.querySelector('.input-age'); 
    refs.searchForm = document.querySelector('.search-form');
    refs.searchFormInput = refs.searchForm.querySelector('input');
    
    return refs;
}

function modalToggle() {
    refs.modalBackdrop.classList.toggle('is-visible');
}
