import { renderComments } from './modules/renderComments.js'
import { initCommentsListeners } from './modules/initListeners.js';
import { comments } from './modules/comments.js'
import { formatDate } from './modules/formatDate.js';

const nameEl = document.getElementById('input-name');
const buttonEl = document.getElementById('button-add');

export const listEl = document.getElementById('list');
export const textEl = document.getElementById('input-text');

renderComments()
initCommentsListeners()

nameEl.addEventListener('input', () => {
    nameEl.classList.remove('error');
});

textEl.addEventListener('input', () => {
    textEl.classList.remove('error');
});

buttonEl.addEventListener('click', () => {

    if (!nameEl.value.trim()) {
    nameEl.classList.add("error");
    }
    if (!textEl.value.trim()) {
    textEl.classList.add("error");
    }
    if (!nameEl.value.trim() || !textEl.value.trim())
    return;

    const now = new Date();
    const nowDate = formatDate(now);

    const newComment = {
    name: nameEl.value,
    date: nowDate,
    text: textEl.value,
    likes: 0,
    isLiked: false
    }

    comments.push(newComment);
    renderComments()
});
