import { Map } from 'immutable';

/**
 * Get a reviver for a Map/(Map/...)/Record immutable structure
 * 
 * @param {Class} recordClass  - a Record class definition
 * @param {function} recordCondition  - default: check for an empty string (standard case for a Map/Record)
 */
export default (recordClass, recordCondition = key => key !== '') => (key, value) => (
    recordCondition(key) ?
        recordClass(value) :
        Map(value)
);