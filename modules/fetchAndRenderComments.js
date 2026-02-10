import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'
import { getComments } from './api.js'

export const fetchAndRenderComments = () => {
    return getComments()
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
}