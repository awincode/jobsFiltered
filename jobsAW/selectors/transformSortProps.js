import R from 'ramda';
import bug from '../../_libs/bug';
import makeIndex from '../../_libs/makeIndex';

import multiSort from './multiSort';
import filterPropAccessorFor from '../reducers/filterPropAccessorFor';

import { List, Iterable } from 'immutable';

// generic 
const getByPropValueOf = R.curry ((obj, getProp, item) => obj[getProp (item)]);
const propIsUndefinedIn = R.curry ((obj, prop) => obj[prop] === undefined);

const wrapInArray = (value) => [value];

const getSize = (obj) =>
    obj[Iterable.isIterable (obj) ? 'size' : 'length'];

const makePropAccessFor = R.curry ((filterState, type, filterName) =>
    (filterState[type].get (filterName) || filterName));


// this better as transform
const transformSortProps = (filterState, filteredRecords) => {
    const filterPropAccessor = filterPropAccessorFor (filterState);

    const getPropName = filterPropAccessor.getPropName;
    const getPropNameMapped = filterPropAccessor.getPropNameMapped;
    const getProp = filterPropAccessor.getProp;

    const getSortOrder = (filter) => filter.sortRest === true ?
            !R.isEmpty (filter.sortOrder) ? filter.sortOrder : undefined :
            filter.sortRest;

    const sortSamples = (filter, sortFilterProps, samples) => {
        const getValueFromIndexBy = R.pipe (
            R.prop, 
            getByPropValueOf (samples.index)
        );

        const mapAsFilterValue = R.map ( getValueFromIndexBy ('id') );


        // multi sort for the extracted items
        const multiSortFor = R.pipe (getSortOrder, sortFilterProps, wrapInArray, multiSort)
        const multiSorted = multiSortFor (filter);

        const sortSamplesFor = R.pipe (multiSorted, mapAsFilterValue);
        const sortedSamples = sortSamplesFor (samples.list);
                                                                        // bug('** sortedSamples', sortedSamples)
        return sortedSamples;

    };

    const getSortedFilterProps = R.curry ((filterName, sortOrder) => {
        // default here in function not in argument, as function is curried
        sortOrder = sortOrder || List ([filterName]);

        const firstElem = sortOrder.get (0)
        let preparedProp;

        if (firstElem === 'text') {
            preparedProp = ['text', getPropName (filterName)];

        // e.g. 'pop'
        } else if (!sortOrder.isEmpty () && firstElem !== 'DSC') {
            preparedProp = getPropNameMapped (firstElem);

        // this only fallback                                            
        } else {
            preparedProp = getPropNameMapped (filterName);
        }

        if (sortOrder.includes()) {
            preparedProp.push('DSC');
        }

        return preparedProp;
    });

    
    const reduceRestToSamples = (getProp, indexIsUndefined) => {

        const bucketReducer = (bucket) => (prev, curr) => {
            const propValue = getProp (curr);

            if (indexIsUndefined (propValue)) {
                bucket[propValue] = bucket[propValue] ||
                    (prev.index[curr.id] = propValue) && prev.list.push (curr) && propValue;
            }

            return prev;
        };

        return R.reduce (bucketReducer ({}), { index:{}, list:[] });

    };

    const filterProps = filterState.__order.map ((filterName) => {
        const filter = filterState[filterName];
        let preparedProp = [];

        if (filter.sel && !filter.sortByOrder) {
            let selIndex = makeIndex (filter.sel);

            preparedProp = [ getPropNameMapped (filterName) ];

            if (filter.sortRest) {
                const getSamplesFromRest = reduceRestToSamples (
                    getProp (filterName), 
                    propIsUndefinedIn (selIndex)
                );

                const sortedSamples = sortSamples (
                    filter, 
                    getSortedFilterProps (filterName), 
                    getSamplesFromRest (filteredRecords)
                );

                selIndex = {
                    ...selIndex, 
                    ...makeIndex (sortedSamples, getSize (filter.sel))
                };
                
            }

            preparedProp.push(selIndex);


        } else if (!R.isEmpty (filter.sortOrder) && filter.sortByOrder) {
            preparedProp = getSortedFilterProps (filterName, filter.sortOrder);
        }

        return preparedProp;

    }, filterState);

    return filterProps;

};

export default transformSortProps;