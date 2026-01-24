import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { addComment } from './api.js';
import { formatDate } from './formatDate.js';

// import { listEl, textEl } from '../index.js'

export const initCommentsListeners = () => {
    const likesElements = document.querySelectorAll('.like-button');

    likesElements.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            comments[index].isLiked = !comments[index].isLiked;
            comments[index].likes += comments[index].isLiked ? 1 : -1;

            renderComments();
        });
    });

    const commentElements = document.querySelectorAll('.comment');

    commentElements.forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
            const inputText = document.getElementById('input-text');
            inputText.value = `> ${comments[index].text} ©${comments[index].author.name}`;
        });
    });
};

export const addNewComment = (nameEl, textEl, buttonEl, formEl, addCommentPlaceholderEl) => {

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

    formEl.classList.add("hidden");
    addCommentPlaceholderEl.classList.remove("hidden");

    addComment(newComment)
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

}