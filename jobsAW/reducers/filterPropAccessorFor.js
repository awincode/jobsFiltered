import R from 'ramda';

const getAutoProp = (prop) => 
    (Array.isArray (prop) ? R.path : R.prop) (prop);

const makePropAccessFor = R.curry ((filterState, type, filterName) =>
    (filterState[type].get (filterName) || filterName));


const filterPropAccessorFor = (filterState) => {
    
    const makePropAccess = makePropAccessFor (filterState);
    const getPropName = makePropAccess ('__pointToPath');
    
    const getPropNameMapped = R.pipe (
        getPropName, 
        makePropAccess ('__mapToPath')
    );

    const getProp = R.compose (getAutoProp, getPropNameMapped);
    
    return {
        getPropName,
        getPropNameMapped,
        getProp,
    };
};

export default filterPropAccessorFor;
