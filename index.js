import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js';
import { initCommentsListeners, addNewComment } from './modules/initListeners.js';

const nameEl = document.getElementById('input-name');
const buttonEl = document.getElementById('button-add');
const listEl = document.getElementById('list');
const textEl = document.getElementById('input-text');

export { listEl, textEl };

listEl.innerHTML = `<li>Загрузка комментариев...</li>`;

const addCommentPlaceholderEl = document.createElement("div");
addCommentPlaceholderEl.textContent = "Добавление комментария...";
addCommentPlaceholderEl.className = "comment-placeholder hidden";

listEl.after(addCommentPlaceholderEl);

const formEl = document.querySelector('.add-form');

fetchAndRenderComments()
initCommentsListeners()

nameEl.addEventListener('input', () => {
    nameEl.classList.remove('error');
});

textEl.addEventListener('input', () => {
    textEl.classList.remove('error');
});

buttonEl.addEventListener('click', () => {
    addNewComment(nameEl, textEl, buttonEl, formEl, addCommentPlaceholderEl)
});
