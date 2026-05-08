import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { getComments } from './api.js'

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            `<p>Комментарии загружаются. Пожалуйста, подождите.</p>`
    }

    return getComments()
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
        .catch((error) => {
            if (error.message.includes('Failed to fetch')) {
                alert('Нет сети. Комментарии не загрузились.')
            } else {
                alert(error.message)
            }
        })
}
