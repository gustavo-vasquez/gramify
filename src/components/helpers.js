import Instagram from '../lib/instagram-web-api/index.js';

const { REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;
const client = new Instagram({ REACT_APP_USERNAME, REACT_APP_PASSWORD }, { language: 'es-ES' });
const RECENT_SEARCHES_KEY = "recentSearches";

export const seeResults = async (event, history) => {
    event.preventDefault();
    const username = event.target.querySelector('[name="username"]').value;
    history.push(`/search/${username}`);
}

export const searchUsers = async (username) => {
    let { users } = await client.search({ query: username, context: 'user' });

    if(users.length > 0) {
        let recents = getRecentSearches();

        if(recents !== null) {
            if(recents.indexOf(username) < 0) {
                if(recents.length < 4)
                    recents.push(username);
                else {
                    recents = recents.slice(1);
                    recents.push(username);
                }
            
                localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recents));
            }
        }
        else
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify([username]));
    }

    return users;
}

export const getRecentSearches = () => {
    let recents = localStorage.getItem(RECENT_SEARCHES_KEY);

    if(recents !== null)
        return JSON.parse(recents);
    
    return [];
}

export const removeRecentSearch = (username) => {
    let recents = localStorage.getItem(RECENT_SEARCHES_KEY);
    
    if(recents !== null) {
        recents = JSON.parse(recents);
        const index = recents.indexOf(username);

        if(index >= 0) {
            recents.splice(index,1);
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recents));
            return recents;
        }
    }

    return [];
}

export const getUserInformation = async (profile) => {
    try {
        const userInfo = await client.getUserByUsername({ username: profile });
        console.log(userInfo);

        return userInfo;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}