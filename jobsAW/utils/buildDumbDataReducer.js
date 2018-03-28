import { Map } from 'immutable';

export default (successActionType, errorActionType, mergeMode = 'merge') => {
    const initState = Map({});

    return (state=initState, action) => {
        switch (action.type) {
            case successActionType:
                return action.payload ?
                    state[mergeMode](action.payload) :
                    state;

            case errorActionType:
            default:
                return state;
        }
    };
};