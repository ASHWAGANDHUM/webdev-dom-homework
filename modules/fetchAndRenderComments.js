import { renderComments } from './renderComments.js'
import { updateComments } from './comments.js'

export const fetchAndRenderComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/philip-k/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()
        })
}