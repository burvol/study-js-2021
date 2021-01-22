'use strict';

const api = {
    baseUrl: 'http://localhost:3000/notes', 
    getAllNotes() {
        return fetch(this.baseUrl)
            .then(response => {
                if(response.ok) return response.json();

                throw new Error('Error while fetching' + response.statusText);
            })
            .catch(err => console.log(err));
    },
    addNote(note) {
        return fetch(this.API_URL, {
                    method: 'POST',
                    body: JSON.stringify(note),
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
    deleteNote(id) {
        return fetch(`${this.baseUrl}/${id}`, {
                 method: 'DELETE'
                })
                .then(response => {
                    if(!response.ok) throw new Error('Не вийшло удалити');
                })
                .catch(error => console.log(error));
    },
    updatedNote(note) {
        return fetch(`${this.baseUrl}/${note.id}`, {
                method: 'PATCH',
                body: JSON.stringify(note),
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
}

document.addEventListener('DOMContentLoaded', () => {

    const refs = selectRefs();

    const state = {
        selectedId: null,
    }

    refs.noteEditor.addEventListener('submit', handleNoteEditorSubmit);
    refs.noteList.addEventListener('click', handleNoteListClick);
    refs.modal.addEventListener('click', handleModalClick);

    init();

    //HELPER FUNCTIONS

    function init() {
        api.getAllNotes()
            .then(notes => {
                const markup = notes.reduce((acc, note) => {
                    return acc + createNoteMarkup(note);
                }, '');

                refs.noteList.insertAdjacentHTML('afterbegin', markup);
            });
    }

    function handleNoteEditorSubmit(e) {
        e.preventDefault();

        const text = refs.noteEditorInput.value;

        if(text === '') return alert('Не залишайте пусту строку!!!');

        api.addNote({text})
            .then(note => {
                const markup = createNoteMarkup(note);
                refs.noteList.insertAdjacentHTML('beforeend', markup);
            })
        
        refs.noteEditor.reset();
    }

    function handleNoteListClick({target}) {
        if(target.nodeName !== 'BUTTON') return;

        const action = target.dataset.action;

        switch(action) {
            case 'edit':
                editNoteStart(target);
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
                editNoteSuccess();
                break;
            case 'close':
                editNoteCancel();
                break;
            default:
                console.log(`Sorry, we are out of ${action}.`);
        }
    }

    function deleteNote(target) {
        const note = target.closest('.note');
        const parentId = note.dataset.id;

        api.deleteNote(parentId)
            .then(() => {
                note.remove();
            });
    }

    function editNoteStart(target) {
        const note = target.closest('.note');
        const noteIdToEdit = note.dataset.id;
        state.selectedId = noteIdToEdit;

        const noteText = note.querySelector('.text').textContent;

        refs.modalInput.value = noteText;

        toggleModal();
    }

    function editNoteCancel () {
        state.selectedId = null;
        refs.modalInput.value = '';
        toggleModal();
    }

    function editNoteSuccess() {

        const noteToUpdate = {
            text: refs.modalInput.value,
            id: state.selectedId,
        }

        api.updatedNote(noteToUpdate)
            .then(updatedNote => {
                const noteTextEl = refs.noteList.querySelector(
                    `.note[data-id="${updatedNote.id}"] .text`,
                );

                noteTextEl.textContent = updatedNote.text;

                toggleModal();
            });
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


    function selectRefs() {
        const refs = {};

        refs.noteEditor = document.querySelector('.note-editor');
        refs.noteEditorInput = refs.noteEditor.querySelector('textarea');
        refs.noteList = document.querySelector('.note-list');
        refs.modalBackdrop = document.querySelector('.backdrop');
        refs.modal = document.querySelector('.modal');
        refs.modalInput = refs.modal.querySelector('.textarea');

        return refs;
    }
})