const host = 'https://wedev-api.sky.pro/api/v2/:philipp-kogai'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export const getComments = () => {
    return fetch(host + '/comments').then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался, попробуйте позже')
        }
        return response.json()
    })
}

export const addComment = (newComment) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: newComment.name,
            text: newComment.text,
            // forceError: true,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался, попробуйте позже')
        }
        if (response.status === 400) {
            throw new Error(
                'Имя и комментарий не должны быть короче трёх символов!',
            )
        }
        return response.json()
    })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}
