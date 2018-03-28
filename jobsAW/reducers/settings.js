import { combineReducers } from 'redux';
import { SET_LANGUAGE_SETTINGS } from '../constants/settings';

const language = (state='en', action) => {
    switch (action.type) {
        case SET_LANGUAGE_SETTINGS:
            return action.payload;

        default:
            return state;
    }
};

export const settings = combineReducers ({
    language,
});