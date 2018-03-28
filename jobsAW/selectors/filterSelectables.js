import R from 'ramda';

import makeIndex from '../../_libs/makeIndex';
import filterPropAccessorFor from '../reducers/filterPropAccessorFor';

import bug from '../../_libs/bug';


export const extractAll = (filters, data) => {
    const bucketReducer = (getProp, bucket) => (prev, curr) => {
        const propValue = getProp (curr);

        bucket[propValue] = bucket[propValue] ||
            prev.push (propValue) && propValue;

        return prev;
    };

    const getNotSelectablesIndex = (filter) => ({
        ...makeIndex (filter.sel, 1),
        ...makeIndex (filter.excl, 1)
    });

    const filterPredicateWith = (notSelectablesIndex) =>
        (elem) => !notSelectablesIndex[elem];

    const uniqueReducer = (filters, filterName) =>
        bucketReducer (filterPropAccessorFor (filters).getProp (filterName), {});

    const selectablesPredicate = (filters, filterName) =>
        R.compose (filterPredicateWith, getNotSelectablesIndex) (filters[filterName]);

    const mapper = (filters) => (filterName) =>
        R.pipe (
            R.reduce (uniqueReducer (filters, filterName), []),
            R.filter (selectablesPredicate (filters, filterName))
        );

    return R.pipe(
        R.map (R.applyTo (filters, mapper)),
        R.map (R.applyTo (data))
    );

};