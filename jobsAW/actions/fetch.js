import { Map, fromJS } from 'immutable';
import * as api from '../api';
import * as consts from '../constants/fetch';
import { selectableTypes } from '../constants/filter';

import reviverFor from '../utils/reviverFor';
import { loader, incLoadedCounter, getLoadingFinished } from '../utils/loadCtrl';

import City from '../records/City';
import Company from '../records/Company';
import Jobs from '../records/Jobs';
import JobsLoc from '../records/JobsLoc';


export { loader, getLoadingFinished };

export const fetchCities = (fetched) => (dispatch, getState) => {
    const { FETCH_CITIES_SUCCESS, FETCH_CITIES_ERROR } = consts;

    return api.fetchCities (fetched).then (
        response => {
            dispatch ({
                type: FETCH_CITIES_SUCCESS,
                fetched,
                payload: fromJS (response, reviverFor (City)),
            });

            incLoadedCounter (dispatch);            
        },
        error => {
            dispatch ({
                type: FETCH_CITIES_ERROR,
                message: error.message || 'Something went wrong.'
            });
        }
    );
};

export const fetchCompanies = () => (dispatch) => {
    const { FETCH_COMPANIES_SUCCESS, FETCH_COMPANIES_ERROR} = consts;

    return api.fetchCompanies ().then (
        response => {
            dispatch ({
                type: FETCH_COMPANIES_SUCCESS,
                payload: fromJS (response, reviverFor (Company)),
            });

            incLoadedCounter (dispatch);            
        },
        error => {
            dispatch ({
                type: FETCH_COMPANIES_ERROR,
                message: error.message || 'Something went wrong.'
            });
        }
    );
};

export const fetchLocCommon = () => (dispatch) => {
    const { FETCH_LOC_COMMON_SUCCESS, FETCH_LOC_COMMON_ERROR } = consts;

    return api.fetchLocCommon ().then (
        response => {
            dispatch ({
                type: FETCH_LOC_COMMON_SUCCESS,
                payload: fromJS (response),
            });

            incLoadedCounter (dispatch);            
        },
        error => {
            dispatch ({
                type: FETCH_LOC_COMMON_ERROR,
                message: error.message || 'Something went wrong.'
            });
        }
    );
};

export const fetchJobs = () => (dispatch) => {
    const { FETCH_CTRL_INCREMENT, FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_ERROR } = consts;

    return api.fetchJobs ().then (
        response => {
            const recordCondition = key => key.length > 3;

            dispatch ({
                type: FETCH_JOBS_SUCCESS,
                payload: Map({
                    details: fromJS (response.details, reviverFor (Jobs, recordCondition)),
                    loc: fromJS (response.loc, reviverFor (JobsLoc, recordCondition))
                }),
            });

            incLoadedCounter (dispatch);
        },
        error => {
            dispatch ({
                type: FETCH_JOBS_ERROR,
                message: error.message || 'Something went wrong.'
            });
        }
    );
};


export const setSelectablesLoadedFlag = (loaded) => ({
    type: consts.SET_SELECTABLES_LOADED,
    payload: loaded
});

export const setSelectables = (type, payload) => ({
    type: selectableTypes[type],
    payload
});
