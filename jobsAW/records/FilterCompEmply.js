import { Record, List } from 'immutable';

/** 
 *  sel: []  selected items
 *  sortOrder: []  sort by a predefined order concept, e.g. by name, population, ...
 *  sortByOrder: boolean  true: use the sortOrder,  false: use the order of the sel array
 *  inclRest: boolean  include other items (except excluded values)
 *  sortRest: true/[]  true: same sort order as in sortOrder,  []: define a different sort order
 *  excl: []  excluded items
 *  rest: []  selectable items
*/
const FilterCompEmplyRecord = Record({
    sel: List([]),
    sortOrder: List([]),
    sortByOrder: false,
    inclRest: false,
    sortRest: true,
    excl: List([]),
    rest: List([]),
});

const FilterCompEmply = FilterCompEmplyRecord;

export default FilterCompEmply;