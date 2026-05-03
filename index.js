import { fetchAndRenderComments } from './modules/fetchAndRenderComments.js'
// import { initFormListeners } from './modules/initListeners.js'
import {
    nameEl,
    textEl,
    buttonEl,
    listEl,
    formEl,
    addCommentPlaceholderEl,
} from './modules/elements.js'

// listEl.innerHTML = `<li>Загрузка комментариев...</li>`
// listEl.after(addCommentPlaceholderEl)

fetchAndRenderComments()
// initFormListeners()
