import Instagram from '../lib/instagram-web-api/index.js';

const { REACT_APP_USERNAME, REACT_APP_PASSWORD } = process.env;
const client = new Instagram({ REACT_APP_USERNAME, REACT_APP_PASSWORD }, { language: 'es-ES' });
const RECENT_SEARCHES_KEY = "recentSearches";
const LAST_VISITED_PROFILES_KEY = "lastVisitedProfiles";

export const mediaTypes = {
    IMAGE: "GraphImage",
    GALLERY: "GraphSidecar",
    VIDEO: "GraphVideo"
}

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
        return userInfo;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}

export const addVisitProfile = (userInformation) => {
    if(userInformation) {
        let list = localStorage.getItem(LAST_VISITED_PROFILES_KEY);
        let newEntry = {
            id: userInformation.id,
            username: userInformation.username,
            full_name: userInformation.full_name,
            profile_picture: userInformation.profile_pic_url,
            is_verified: userInformation.is_verified
        };

        if(list !== null) {
            list = JSON.parse(list);

            if(!containsUserProfile(newEntry, list)) {
                if(list.length >= 8)
                    list = list.slice(1);

                list.push(newEntry);
                localStorage.setItem(LAST_VISITED_PROFILES_KEY, JSON.stringify(list));
            }
        }
        else
            localStorage.setItem(LAST_VISITED_PROFILES_KEY, JSON.stringify([newEntry]));
    }
}

export const getVisitedProfiles = () => {
    let list = localStorage.getItem(LAST_VISITED_PROFILES_KEY);
    list = JSON.parse(list);

    if(Array.isArray(list) && list.length > 0) {
        return list;
    }

    return null;
}

function containsUserProfile(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }

    return false;
}

export const goNextPage = async (username, cursor) => {
    let data = await client.getPhotosByUsername({ username: username, after: cursor });
    //console.log(data);

    if(data === undefined)
        console.log("Venció la cuota de peticiones.");

    return data;
}

export const getMediaData = async (shortcode) => {
    let data = await client.getMediaByShortcode({ shortcode: shortcode });

    if(data === undefined)
        console.log("Venció la cuota de peticiones.");

    return data;
}