import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { listEl, textEl } from '../index.js'

export const initCommentsListeners = () => {
    listEl.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (!li) return;

    const index = Number(li.dataset.index);
    const comment = comments[index];

    if (event.target.closest('.like-button')) {
        comment.isLiked = !comment.isLiked;
        comment.likes += comment.isLiked ? 1 : -1;
        renderComments();
        return;
    }

    textEl.value = `> "${comment.text}" © ${comment.name}`;
    });
};