import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { getComments } from './api.js'

export const fetchAndRenderComments = () => {
    return getComments()
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
        .catch((error) => {
            if (error.message.includes("Failed to fetch")) {
                alert("Нет сети. Комментарии не загрузились.")
            } else {
                alert("Ошибка при загрузке комментариев.")
            }
        })
}