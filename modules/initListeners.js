import { renderComments } from './renderComments.js'
import { comments } from './comments.js'
import { fetchAndRenderComments } from './fetchAndRenderComments.js'
import { addComment } from './api.js'
import { formatDate } from './formatDate.js'
import { formEl, addCommentPlaceholderEl } from './elements.js'

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

export const initFormListeners = () => {
    const nameEl = document.getElementById('input-name')
    const textEl = document.getElementById('input-text')
    const buttonEl = document.getElementById('button-add')

    if (!nameEl || !textEl || !buttonEl) return // если элементов нет - выходим (разобраться позже, как оптимизировать)

    nameEl.addEventListener('input', () => {
        nameEl.classList.remove('error')
    })

    textEl.addEventListener('input', () => {
        textEl.classList.remove('error')
    })

    buttonEl.addEventListener('click', () => {
        addNewComment()
    })
}

export const initCommentInteractionListeners = () => {
    const likesElements = document.querySelectorAll('.like-button')

    likesElements.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()

            if (comments[index].isLikeLoading) {
                return
            }

            comments[index].isLikeLoading = true
            renderComments()

            delay(2000).then(() => {
                comments[index].isLiked = !comments[index].isLiked
                comments[index].likes += comments[index].isLiked ? 1 : -1
                comments[index].isLikeLoading = false

                renderComments()
            })
        })
    })

    const commentElements = document.querySelectorAll('.comment')

    commentElements.forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
            const textEl = document.getElementById('input-text') // динамический запрос, т.к. baseHtml всё рушит
            if (textEl) {
                textEl.value = `> ${comments[index].text} ©${comments[index].author.name}`
            }
        })
    })
}

export const addNewComment = () => {
    const nameEl = document.getElementById('input-name')
    const textEl = document.getElementById('input-text')
    const buttonEl = document.getElementById('button-add')

    // formEl и addCommentPlaceholderEl можно оставить из elements.js, если они не пересоздаются
    // Но для надежности лучше найти и их, если они внутри container
    const form = document.querySelector('.add-form')
    const placeholder = document.querySelector('.comment-placeholder')

    const addCommentPlaceholderEl = document.querySelector(
        '.comment-placeholder',
    )

    if (!nameEl || !textEl || !buttonEl) {
        console.error('Элементы формы не найдены!')
        return
    }

    const savedName = nameEl.value
    const savedText = textEl.value

    if (!nameEl.value.trim()) {
        nameEl.classList.add('error')
    }
    if (!textEl.value.trim()) {
        textEl.classList.add('error')
    }
    if (!nameEl.value.trim() || !textEl.value.trim()) return

    const now = new Date()
    const nowDate = formatDate(now)

    const newComment = {
        name: nameEl.value,
        date: nowDate,
        text: textEl.value,
        likes: 0,
        isLiked: false,
    }

    // разобраться позже
    if (form) form.classList.add('hidden')
    if (placeholder) placeholder.classList.remove('hidden')
    // formEl.classList.add('hidden')
    // addCommentPlaceholderEl.classList.remove('hidden')

    addComment(newComment)
        .then(() => {
            return fetchAndRenderComments()
        })
        .then(() => {
            if (placeholder) placeholder.classList.add('hidden')
            if (form) form.classList.remove('hidden')
            // addCommentPlaceholderEl.classList.add('hidden')
            // formEl.classList.remove('hidden')

            nameEl.value = ''
            textEl.value = ''
        })
        .catch((error) => {
            if (placeholder) placeholder.classList.add('hidden')
            if (form) form.classList.remove('hidden')
            // addCommentPlaceholderEl.classList.add('hidden')
            // formEl.classList.remove('hidden')
            nameEl.value = savedName
            textEl.value = savedText

            if (error.message.includes('Failed to fetch')) {
                alert('Нет сети. Проверьте подключение.')
            } else if (
                error.message ===
                'Имя и комментарий не должны быть короче трёх символов!'
            ) {
                nameEl.classList.add('error')
                textEl.classList.add('error')
                alert(error.message)
            } else {
                alert(error.message)
            }

            buttonEl.disabled = false
            buttonEl.textContent = 'Ошибка'
            buttonEl.classList.add('error')
            setTimeout(() => {
                buttonEl.textContent = 'Написать'
                buttonEl.classList.remove('error')
            }, 1500)
        })
}
