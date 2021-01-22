'use strict';

const API_URL = 'http://localhost:3000/notes';

const refs = {
    noteEditor: document.querySelector('.note-editor'),
    noteEditorInput: document.querySelector('.note-editor textarea'),
    noteList: document.querySelector('.note-list'),
    modalBackdrop: document.querySelector('.backdrop'),
    modalInput: document.querySelector('.modal textarea'),
    modal: document.querySelector('.modal'),
}

const state = {
    selectedId: null,
}

init();

refs.noteEditor.addEventListener('submit', handleNoteEditorSubmit);
refs.noteList.addEventListener('click', handleNoteListClick);
refs.modal.addEventListener('click', handleModalClick);

function init() {
    fetch(API_URL)
        .then(reserve => reserve.json())
        .then(notes => {
            const markup = notes.reduce((acc, note) => {
                return acc + createNoteMarkup(note);
            }, '');

            refs.noteList.insertAdjacentHTML('afterbegin', markup);
        })
        .catch(err => console.log(err));
}

function handleNoteEditorSubmit(e) {
    e.preventDefault();

    const text = refs.noteEditorInput.value;

    if(text === '') return alert('Не залишайте пусту строку!!!');

    const nodeToAdd = {text};

    refs.noteEditor.reset();

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(nodeToAdd),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(note => {
            const markup = createNoteMarkup(note);

            refs.noteList.insertAdjacentHTML('beforeend', markup);
        })
        .catch(err => console.log(err));
}

function handleNoteListClick({target}) {
    if(target.nodeName !== 'BUTTON') return;

    const action = target.dataset.action;

    switch(action) {
        case 'edit':
            updatedNote(target);
            break;
        case 'delete':
            deleteNote(target);
            break;
        default :
            console.log(`Sorry, we are out of ${action}.`);
    }
}

function handleModalClick({target}) {
    if(target.nodeName !== 'BUTTON') return;

    const action = target.dataset.action;

    switch(action) {
        case 'save':
            console.log('click save');
            saveNote();
            break;
        case 'close':
            toggleModal();
            break;
        default:
            console.log(`Sorry, we are out of ${action}.`);
    }
}

function deleteNote(target) {
    const parent = target.closest('.note');
    const parentId = parent.dataset.id;

    fetch(`${API_URL}/${parentId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if(!response.ok) throw new Error('Не вийшло удалити');

            parent.remove();
        })
        .catch(error => console.log(error));
}

function updatedNote(target) {
    const note = target.closest('.note');
    const noteContent = note.querySelector('.text').textContent;
    const noteIdToUpdate = note.dataset.id;

    state.selectedId = noteIdToUpdate;

    toggleModal();

    refs.modalInput.textContent = noteContent;

    console.log(noteContent);

    
}

function saveNote() {

    const updatedNoteContent = refs.modalInput.value;
    const noteIdToUpdate = state.selectedId;

    const noteToUpdate = {
        text: updatedNoteContent,
    }

    fetch(`${API_URL}/${noteIdToUpdate}`, {
        method: 'PATCH',
        body: JSON.stringify(noteToUpdate),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(updatedNote => {
            const noteTextEl = refs.noteList.querySelector(
                `.note[data-id="${updatedNote.id}"] .text`,
            );

            noteTextEl.textContent = updatedNote.text;

            // updatedNoteContent.reset();

            toggleModal();

            modalInput.value = '';
        })
        .catch(err => console.log(err));
}

//Вертає розмітку
function createNoteMarkup({ id, text }) {
    return `
    <li class="note" data-id="${id}">
        <div class="actions">
            <button class="button" data-action="edit">Редактировать</button>
            <button class="button" data-action="delete">Удалить</button>
        </div>
        <p class="text">${text}</p>
    </li>
    `;
}

function toggleModal() {
    refs.modalBackdrop.classList.toggle('is-visible');
}