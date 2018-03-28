import { combineReducers } from 'redux';
import { List, Map, fromJS, Iterable } from 'immutable';
import FilterCity from '../records/FilterCity';
import FilterJobType from '../records/FilterJobType';
import FilterCompIndustry from '../records/FilterCompIndustry';
import FilterCompEmply from '../records/FilterCompEmply';

import R from 'ramda';

import { 
    filterTypes,
    selectableTypes,
    updateTypes,
    moveTypes,
    onlyTopTypes,
    UPDATE_FILTER_ISMOVING,
    UPDATE_ISMOVING_FROM_ZONE,
} from '../constants/filter';

import bug from '../../_libs/bug';


const initPointToPath = Map ({
    jobType: 'type',
    compIndy: 'indy',
    compEmply: 'emply',
});

const initMapToPath = Map ({
    indy: ['param', 'indy'],
    emply: ['param', 'emply'],
    pop: ['param', 'pop'],
});

const locRefForFilterType = {
    jobType: ['job', 'type'],
    compIndy: ['comp', 'indy'],
    compEmply: ['comp', 'emply'],
    city: ['city', 'name'],
};


// this from user params
export const initStateOrder = List(['city', 'jobType', 'compIndy', 'compEmply']);

export const __order = (state=initStateOrder, action) => {
    switch (action.type) {
        case updateTypes._:
            return swapOrder (state, action);

        default:
            return state;
    }
};

export const __isMoving = (state=false, action) => {
    switch (action.type) {
        case UPDATE_FILTER_ISMOVING:
            return action.payload;

        default:
            return state;
    }
};

export const __movingFromZone = (state=null, action) => {
    switch (action.type) {
        case UPDATE_ISMOVING_FROM_ZONE:
            return action.payload;

        default:
            return state;
    }
};

const __pointToPath = (state=initPointToPath, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const __mapToPath = (state=initMapToPath, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const swapOrder = (state, action) => 
    state
        .set (action.payload.index, state.get (action.payload.atIndex))
        .set (action.payload.atIndex, action.payload.elem);

const updateZone = (state, action) => 
    state.set (action.env[0], swapOrder (state.get (action.env[0]), action));

const moveToZone = (state, action) => {
    const fromZone = state.get (action.env[0]);
    const toZone = state.get (action.env[1]);

    const newState = state
        .set (action.env[0], fromZone.delete (action.payload.index))
        .set (action.env[1], toZone.insert (action.payload.atIndex, action.payload.elem))

    return newState;
};

const initStateTypes = {};

/** 
 *  sel: []  selected items
 *  sortOrder: []  sort by a predefined order concept, e.g. by name, population, ...
 *  sortByOrder: boolean  true: use the sortOrder,  false: use the order of the sel array
 *  inclRest: boolean  include other items (except excluded values)
 *  sortRest: true/[]  
 *      - true: same sort order as in sortOrder, if no sortOrder, sort by filter value
 *      - []: define a different sort order (can also be expressivly the filter value, if sortOrder is defined, 
 *              but should not be the sorting for the rest, e.g. ['city'] for FilterCity)
 *  excl: []  excluded items
*/
export const initStateCity = new FilterCity({
    // sel: List(['F']),
    sel: List(['S', 'M']),
    // sortOrder: ['pop', 'name'],
    sortOrder: List(['pop']),
    // sortOrder: ['pop', 'name','DSC'],
    sortByOrder: false,
    // sortByOrder: true,
    // inclRest: false,
    inclRest: true,
    // sortRest: false,
    // sortRest: true,
    // sortRest: ['city'],
    // sortRest: ['pop'],
    sortRest: List(['pop']),
    // sortRest: ['pop', 'DSC'],
    // sortRest: ['text', 'DSC'],
    // sortRest: ['text'],
    // excl: List(['K']),
    excl: List([]),
    // rest: null
    
});

initStateTypes.city = initStateCity;



const initStateCompIndy = new FilterCompIndustry({
    sel: List ([2,1]),
    // sel: [],
    // sortOrder: [1,2],
    sortOrder: List (['text']),
    // sortByOrder: true,
    sortByOrder: false,
    inclRest: true,
    // sortRest: true,
    sortRest: false,
    // excl: [3]
    excl: List ([]),
    // rest: null
    // rest: List ([])
});

initStateTypes.compIndy = initStateCompIndy;


const initStateCompEmply = new FilterCompEmply({
    // sel: [],
    // sel: List ([4,5,6,9]),
    sel: List ([4, 6,9]),
    // sel: [9,6,5,4],
    // sortOrder: ['emply'],
    // sortOrder: ['DSC'],
    sortOrder: List (['DSC']),
    // sortByOrder: true,
    sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: List ([]),
    // rest: null
});

initStateTypes.compEmply = initStateCompEmply;


const initStateJobType = new FilterJobType({
    sel: List ([1, 3]),
    sortOrder: List (['text']),
    // sortByOrder: true,
    sortByOrder: false,
    inclRest: true,
    // inclRest: false,
    sortRest: true,
    // sortRest: false,
    excl: List ([]),
    // excl: List ([2]),
});

initStateTypes.jobType = initStateJobType;


const makeFilterReducer = (filter) =>
    (state=initStateTypes[filter], action) => {
        switch (action.type) {
            case selectableTypes[filter]:
                return state.set ('rest', List (action.payload));

            case updateTypes[filter]:
                return updateZone (state, action);

            case moveTypes[filter]:
                return moveToZone (state, action);

            case onlyTopTypes[filter]:
                return state.set ('inclRest', !state.inclRest);

            default:
                return state;
        }
    };


export const filterReducers = filterTypes.reduce ((acc, filter) => {
    acc[filter] = makeFilterReducer (filter);
    return acc;
}, {});

export const filter = combineReducers ({
    __order,
    __isMoving,
    __movingFromZone,
    __pointToPath,
    __mapToPath,
    city: filterReducers.city,
    compIndy: filterReducers.compIndy,
    compEmply: filterReducers.compEmply,
    jobType: filterReducers.jobType,
});


export const getFilter = (state) => state.ui.filter;

export const getFilterIsMoving = (state) => state.ui.filter.__isMoving;
export const getMovingFromZone = (state) => state.ui.filter.__movingFromZone;

export const getFilterOrder = (state) => state.ui.filter.__order;

export const getFilterZoneFor = (state) => (filter, zone) => state.ui.filter[filter].get (zone);
export const getFilterTopOnlyFor = (state) => (filter) => !state.ui.filter[filter].inclRest;

export const getLocForFilterType = (loc, filterType) => {
    if (!loc) {
        return;
    }

    const locRef = locRefForFilterType[filterType];

    return loc[locRef[0]].get (locRef[1]);
};
