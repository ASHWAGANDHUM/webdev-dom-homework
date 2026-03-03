import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js';
import { initCommentsListeners, addNewComment } from './modules/initListeners.js';
import { nameEl, textEl, buttonEl, listEl, formEl } from './modules/elements.js';

listEl.innerHTML = `<li>Загрузка комментариев...</li>`;

const addCommentPlaceholderEl = document.createElement("div");
addCommentPlaceholderEl.textContent = "Добавление комментария...";
addCommentPlaceholderEl.className = "comment-placeholder hidden";

listEl.after(addCommentPlaceholderEl);

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
