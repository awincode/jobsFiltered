import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import buildDumbDataReducer from '../utils/buildDumbDataReducer';
import { 
    FETCH_CITIES_SUCCESS, 
    FETCH_COMPANIES_SUCCESS,
    FETCH_LOC_COMMON_SUCCESS, 
    FETCH_LOC_COMMON_ERROR,
    FETCH_JOBS_SUCCESS, 
} from '../constants/fetch'


const initState = fromJS({details:{}, loc:{}});

const jobs = (state=initState, action) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            return action.payload ?
                state.mergeDeep(action.payload) :
                state;

        default:
            return state;
    }
};

const cities = buildDumbDataReducer (FETCH_CITIES_SUCCESS);
const companies = buildDumbDataReducer (FETCH_COMPANIES_SUCCESS);
const locCommon = buildDumbDataReducer (FETCH_LOC_COMMON_SUCCESS, FETCH_LOC_COMMON_ERROR, 'mergeDeep');

export const data = combineReducers({
    cities,
    companies,
    locCommon,
    jobs
});