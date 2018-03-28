import * as actions from './filter';
import * as types from '../constants/filter';

describe ('filter actions', () => {
    it ('should update the filter order', () => {
        const elem = 'city';

        const payload = {
            index: 0,
            atIndex: 1
        };

        const expectedAction = {
            type: types.updateTypes._,
            payload: {
                elem,
                ...payload
            },
            env: undefined
        };

        expect(actions.updateFilter(elem, payload)).toEqual(expectedAction);
    });
});
