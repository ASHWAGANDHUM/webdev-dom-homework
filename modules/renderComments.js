import { comments } from './comments.js'
import { replaceStrings } from './replaceStrings.js'
import { listEl } from '../index.js'
import { formatDate } from './formatDate.js'

export const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
    return `
    <li data-index="${index}" class="comment">
        <div class="comment-header">
        <div>${replaceStrings(comment.author.name)}</div>
        <div>${replaceStrings(formatDate(comment.date))}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text">${replaceStrings(comment.text)}</div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
        </div>
        </div>
    </li>
    `;
    }).join("");

    listEl.innerHTML = commentsHtml;
}