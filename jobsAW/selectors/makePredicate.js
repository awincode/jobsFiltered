import R from 'ramda';

import bug from '../../_libs/bug';


const comparator = R.curry ((getProp, sel, inclRest, excl, xObj) => {
    const x = getProp (xObj);

    // only sel
    if (!inclRest && !R.isEmpty (sel)) {
        return R.contains (x, sel);

    // all without excl
    } else if (!R.isEmpty (excl)) {
        return !R.contains (x, excl);

    // all
    } else {
        return true;
    }
});

const isPath = (pathOrProp) => Array.isArray (pathOrProp);

// pathOrProp is a prop in the Map or a path in richJobData
const makePredicate = (sel, inclRest, excl, pathOrProp) => {
    let getProp = R.identity;
    let prop = pathOrProp;

    if (isPath (pathOrProp)) {
        getProp = R.prop (pathOrProp[1]);
        prop = pathOrProp[0];
    }

    return R.propSatisfies (comparator (getProp, sel, inclRest, excl), prop);
}

export default makePredicate;