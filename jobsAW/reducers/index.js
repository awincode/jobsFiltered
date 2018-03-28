import { combineReducers } from 'redux';

import { settings } from './settings';
import { data } from './fetchData';
import { ui } from './ui';
import { loadCtrlReducer, getLoadingFinished } from '../utils/loadCtrl';
import { SET_SELECTABLES_LOADED } from '../constants/fetch';


const selectablesLoaded = (state=false, action) => {
    switch (action.type) {
        case SET_SELECTABLES_LOADED:
            return action.payload;

        default:
            return state;
    }
};

const loadFlags = combineReducers ({
    selectablesLoaded
})

export default combineReducers ({
    settings,
    loadCtrl: loadCtrlReducer,
    loadFlags,
    data,
    ui,
});

const getSelectablesLoadedFlag = (state) => state.loadFlags.selectablesLoaded;

export { getLoadingFinished, getSelectablesLoadedFlag };

