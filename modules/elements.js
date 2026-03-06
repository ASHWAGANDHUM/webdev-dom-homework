export const nameEl = document.getElementById('input-name')
export const buttonEl = document.getElementById('button-add')
export const listEl = document.getElementById('list')
export const textEl = document.getElementById('input-text')
export const formEl = document.querySelector('.add-form')

const addCommentPlaceholderEl = document.createElement('div')
addCommentPlaceholderEl.textContent = 'Добавление комментария...'
addCommentPlaceholderEl.className = 'comment-placeholder hidden'

export { addCommentPlaceholderEl }
