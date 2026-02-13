export const getComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/philipp-kogai/comments')
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался, попробуйте позже");
            }
            return response.json();
        })
};

export const addComment = (newComment) => {
    return fetch('https://wedev-api.sky.pro/api/v1/philipp-kogai/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: newComment.name,
            text: newComment.text,
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался, попробуйте позже");
            }
            if (response.status === 400) {
                throw new Error("Имя и комментарий не должны быть короче трёх символов!");
            }
            return response.json();
        });
};