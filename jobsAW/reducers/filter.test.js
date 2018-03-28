// import * as reducer from './filter';
import { __order, initStateOrder, filterReducers, initStateCity } from './filter';
import * as types from '../constants/filter';

import FilterCity from '../records/FilterCity';
import FilterCompIndustry from '../records/FilterCompIndustry';

import { List } from 'immutable';

describe ('filter reducer', () => {
    describe ('__order', () => {
        const initialState = initStateOrder;
        const endState_citySwapped = List(['jobType', 'city', 'compIndy', 'compEmply']);
        const endState_jobTypeSwapped = List(['jobType', 'compIndy', 'city', 'compEmply']);
        
        const payload_swapCity = {
            elem: 'city',
            index: 0,
            atIndex: 1
        };

        const payload_swapJobType = {
            elem: 'compIndy',
            index: 2,
            atIndex: 1
        };

        it ('should return the initial state', () => {
            expect (__order (undefined, {})).toEqual (initialState);
        });

        describe ('update order', () => {
            it ('should swap city backward', () => {
                expect (__order (initialState, {
                    // type: types.UPDATE_FILTER_ORDER,
                    type: types.updateTypes._,
                    payload: payload_swapCity
                })).toEqual (endState_citySwapped)
            })
    
            it ('should swap jobType forward', () => {
                expect (__order (endState_citySwapped, {
                    // type: types.UPDATE_FILTER_ORDER,
                    type: types.updateTypes._,
                    payload: payload_swapJobType
                })).toEqual (endState_jobTypeSwapped)
            });
    
        });


    });

    describe ('city', () => {
        const initialState = new FilterCity({
            sel: List(['S', 'M']),
            sortOrder: List(['pop']),
            sortByOrder: false,
            inclRest: true,
            sortRest: List(['pop']),
            excl: List([]),
        });        

        const restPayload = ['K', 'F'];

        const endState_selSwapped = new FilterCity({
            sel: List(['M', 'S']),
            sortOrder: List(['pop']),
            sortByOrder: false,
            inclRest: true,
            sortRest: List(['pop']),
            excl: List([]),
        });

        const endState_movedFromSelToExcl = new FilterCity({
            sel: List(['M']),
            sortOrder: List(['pop']),
            sortByOrder: false,
            inclRest: true,
            sortRest: List(['pop']),
            excl: List(['S']),
        })

        const payload_swapSel = {
            elem: 'S',
            index: 0,
            atIndex: 1
        };

        const payload_moveSelToExcl = {
            elem: 'S',
            index: 0,
            atIndex: 1
        };

        it ('should return the initial state', () => {
            expect (filterReducers.city (undefined, {})).toEqual (initialState);

        });

        describe ('fill in rest values', () => {
            describe ('rest list', () => {
                it ('should change from null to passed values', () => {
                    expect (filterReducers.city (initialState, {
                        type: types.selectableTypes.city,
                        payload: restPayload
                    }).rest).toEqual (List (restPayload));
                });
            });
        });
        

        describe ('update order', () => {
            describe('for selected filters sel', () => {
                it ('should swap the first two elems', () => {
                    expect (filterReducers.city (initialState, {
                        type: types.updateTypes.city,
                        env: ['sel'],
                        payload: payload_swapSel
                    })).toEqual (endState_selSwapped);
                });
            });
        });

        describe ('move between zones', () => {
            describe('from sel to excl', () => {
                it ('should move S', () => {
                    expect (filterReducers.city (initialState, {
                        type: types.moveTypes.city,
                        env: ['sel', 'excl'],
                        payload: payload_moveSelToExcl
                    })).toEqual (endState_movedFromSelToExcl);
                });
            });
        });

        describe('toggle only top flag', () => {
            it ('should return false for .inclRest', () => {
                expect (filterReducers.city (initialState, {
                    type: types.onlyTopTypes.city,
                    
                }).inclRest).toEqual (false);
            });
        });
                
    });
    

    describe ('compIndy', () => {
        const type = 'compIndy';
        const reducer = filterReducers[type]

        const initialState = new FilterCompIndustry({
            sel: List ([2,1]),
            sortOrder: List (['text']),
            sortByOrder: false,
            inclRest: true,
            sortRest: false,
            excl: List ([]),
            // rest: List ([])
        });        

        const restPayload = [3];

        const endState_rest = new FilterCompIndustry({
            sel: List ([2,1]),
            sortOrder: List (['text']),
            sortByOrder: false,
            inclRest: true,
            sortRest: false,
            excl: List ([]),
            rest: List (restPayload),
        });        

        it ('should return the initial state', () => {
            expect (reducer (undefined, {})).toEqual (initialState);
        });

        describe ('fill in rest values', () => {
            describe ('rest list', () => {
                it ('should change from null to passed values', () => {
                    expect (reducer (initialState, {
                        type: types.selectableTypes[type],
                        payload: restPayload
                    })).toEqual (endState_rest);
                });
            });
        });
                
    });
    
});
