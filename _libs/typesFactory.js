export default (types, template, option = {}) => {
    const typesObj = types.reduce ((prev, elem) => {
        prev[elem] = template.join (elem.toUpperCase ());
        return prev;
    }, {})

    return Object.assign (typesObj, option);
    // return {...typesObj, ...option};
};