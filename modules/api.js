export const getComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/philipp-kogai/comments')
        .then((response) => response.json())
};

export const addComment = (newComment) => {
    return fetch('https://wedev-api.sky.pro/api/v1/philipp-kogai/comments', {
        method: 'POST',
        body: JSON.stringify(newComment)
    })
        .then((response) => response.json());
};