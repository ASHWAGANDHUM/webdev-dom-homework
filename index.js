import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js';
import { initCommentsListeners } from './modules/initListeners.js';
import { formatDate } from './modules/formatDate.js';

const nameEl = document.getElementById('input-name');
const buttonEl = document.getElementById('button-add');

export const listEl = document.getElementById('list');
export const textEl = document.getElementById('input-text');

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

    const formEl = document.querySelector('.add-form');

    formEl.classList.add("hidden");
    addCommentPlaceholderEl.classList.remove("hidden");

    fetch('https://wedev-api.sky.pro/api/v1/philip-kogai/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
            return response.json()
        })
        .then(() => {
            return fetchAndRenderComments()
        })
        .then(() => {
            addCommentPlaceholderEl.classList.add("hidden");
            formEl.classList.remove("hidden");

            nameEl.value = "";
            textEl.value = "";
        })
        .catch(() => {
            addCommentPlaceholderEl.classList.add("hidden");
            formEl.classList.remove("hidden");

            buttonEl.disabled = false;
            buttonEl.textContent = "Ошибка";
            buttonEl.classList.add("error");
            setTimeout(() => {
                buttonEl.textContent = "Написать";
                buttonEl.classList.remove("error");
            }, 1500);
        })
});
