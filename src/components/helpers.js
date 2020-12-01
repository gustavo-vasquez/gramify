import Instagram from '../lib/instagram-web-api/index.js';

const { REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;
const client = new Instagram({ REACT_APP_USERNAME, REACT_APP_PASSWORD }, { language: 'es-ES' });

export const seeResults = async (event, history) => {
    event.preventDefault();
    const username = event.target.querySelector('[name="username"]').value;
    history.push(`/search/${username}`);
}

export const searchUsers = async (username) => {
    let { users } = await client.search({ query: username, context: 'user' });
    return users;
}