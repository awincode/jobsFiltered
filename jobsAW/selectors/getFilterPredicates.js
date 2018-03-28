import { createSelector } from 'reselect';
import makePredicate from './makePredicate';
import filterPropAccessorFor from '../reducers/filterPropAccessorFor';
import { getFilter, getFilterZoneFor } from '../reducers/filter';


const makePredicateSelector = (filterProp) => (
    createSelector (
        state => state.ui.filter[filterProp].sel,
        state => state.ui.filter[filterProp].inclRest,
        state => state.ui.filter[filterProp].excl,
        getFilter,
    
        (sel, inclRest, excl, filterState) => 
            makePredicate (sel, inclRest, excl, filterPropAccessorFor (filterState).getPropNameMapped (filterProp))
    )
);

export const getPredicateCity = makePredicateSelector ('city');
export const getPredicateJobType = makePredicateSelector ('jobType');
export const getPredicateCompIndy = makePredicateSelector ('compIndy');
export const getPredicateCompEmply = makePredicateSelector ('compEmply');
