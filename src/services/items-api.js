import tokenService from '../../src/utils/tokenService';

// const BASE_URL = '/api/items';
const BASE_URL = 'https://equip-t.herokuapp.com/api/items';

export function getAll() {
    return fetch(BASE_URL)
        .then(res => res.json());
}

export function create(item) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(item)
    };
    return fetch(BASE_URL, options).then(res => res.json());
}

export function update(item) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(item)
    };
    return fetch(`${BASE_URL}/${item._id}`, options).then(res => res.json());
}

export function deleteOne(id) {
    const options = {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + tokenService.getToken() }
    };
    return fetch(`${BASE_URL}/${id}`, options).then(res => res.json());
}