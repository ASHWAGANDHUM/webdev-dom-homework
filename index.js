import { renderComments } from './modules/renderComments.js'
import { initCommentsListeners } from './modules/initListeners.js';
import { updateComments } from './modules/comments.js'
import { formatDate } from './modules/formatDate.js';

const nameEl = document.getElementById('input-name');
const buttonEl = document.getElementById('button-add');

export const listEl = document.getElementById('list');
export const textEl = document.getElementById('input-text');

listEl.innerHTML = `<li>Загрузка комментариев...</li>`;

fetch('https://wedev-api.sky.pro/api/v1/philip-k/comments', {
    method: 'GET',
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateComments(data.comments)
        renderComments()
    })

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

    buttonEl.disabled = true;
    buttonEl.textContent = "Отправка...";

    fetch('https://wedev-api.sky.pro/api/v1/philip-k/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
    })
        .then((response) => {
            return response.json()
        })
        .then(() => {
            return fetch('https://wedev-api.sky.pro/api/v1/philip-k/comments')
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()
            buttonEl.disabled = false;
            buttonEl.textContent = "Написать";
            textEl.value = "";
        })
        .catch(() => {
            buttonEl.disabled = false;
            buttonEl.textContent = "Ошибка";
            buttonEl.classList.add("error");
            setTimeout(() => {
                buttonEl.textContent = "Написать";
                buttonEl.classList.remove("error");
            }, 1500);
        })
});
