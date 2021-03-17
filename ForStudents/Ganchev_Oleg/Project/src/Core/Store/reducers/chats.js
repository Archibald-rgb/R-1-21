import update from 'react-addons-update';

const storeChats = {
    chats: [],
}

export default (store = storeChats, action) => {
    switch (action.type) {
        case "LOAD_CHATS_SUCCESS": {
            return update(store, {
                chats: { $set: action.payload.data }
            });
        }
        case 'ADD_CHAT': {
            return update(store, {
                chats: { $push: [action.paramChat] }
            });
        }
        default: {
            return store;
        }
    }
};

/* хранение данных в Redux store

import { ADD_CHAT } from '@actions/chats'
import update from 'react-addons-update';

const storeChats = {
    chats: [
        { title: 'Chat with Admin', userId: 0 },
    ],
}

export default (store = storeChats, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            return update(store, {
                chats: { $push: [action.paramChat] }
            });
        }
        default: {
            return store;
        }
    }
 };
 */
