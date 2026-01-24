import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { listEl, textEl } from '../index.js'

export const initCommentsListeners = () => {
    const likesElements = document.querySelectorAll('.like-button');

    likesElements.forEach((button) => {
        button.addEventListener('click', (event) => {

        event.stopPropagation();

        const index = Number(button.dataset.index);
        const comment = comments[index];

        comment.isLiked = !comment.isLiked;
        comment.likes += comment.isLiked ? 1 : -1;

        renderComments();
        });
    });

    const commentElements = document.querySelectorAll('.comment');

    commentElements.forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
        const comment = comments[index];
        textEl.value = `> "${comment.text}" © ${comment.author.name}`;
        });
    });
};