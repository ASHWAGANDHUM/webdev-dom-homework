import { comments } from './comments.js'
import { replaceStrings } from './replaceStrings.js'
import { listEl } from './elements.js'
import { formatDate } from './formatDate.js'
import { initCommentInteractionListeners } from './initListeners.js'

export const renderComments = () => {
    const container = document.querySelector('.container')

    const commentsHtml = comments
        .map((comment, index) => {
            return `
        <li class="comment">
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
                <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}"></button>
            </div>
            </div>
        </li>
        `
        })
        .join('')

    const addCommentsHTML = `

            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    id="input-name"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                    id="input-text"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button" id="button-add">
                        Написать
                    </button>
                </div>
            </div>`

    const linkToLoginText = `<p>Чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

    const baseHTML = `
            <ul class="comments">${commentsHtml}</ul>
            ${linkToLoginText}
        `

    container.innerHTML = baseHTML

    initCommentInteractionListeners()
}
