import { fromJS } from 'immutable';

// const bug = console.log;
/**
 *  A simple loading control
 * 
 *      Observes the number of the loaded items
 * 
 *  Usage
 *      init an instance in a util component (e.g. loadCtrl):
 *          import simpleLoadCtrl from '../../_libs/simpleLoadCtrl';
 *          import { FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT } from '../constants/fetch';
 * 
 *          const loadCtrl =  simpleLoadCtrl(FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT);
 * 
 *          export const loader = loadCtrl.loader;
 *          export const reducerLc = loadCtrl.reducer;
 *          export const dispatchIncLc = loadCtrl.incLoadedCounter;
 *          export const finishedLc = loadCtrl.finished('loadCtrl');  // pass the reducer name as key 
 * 
 *      actions: 
 *          export { actionLc as loadCtrl };
 *          dispatchIncLc(dispatch); at the end of every successful fetch promise
 * 
 *      reducers:
 *          combine loadCtrl: reducerLc, into reducers
 * 
 *      componentDidMount:
 *          call action loadCtrl(n) with n as number of load actions
 * 
 *      component rendering:
 *          add a props allLoaded={finished(state)}
 * 
 *      check for allLoaded by allLoaded() [true/false]
 * 
 */
export default (
    setActionConst = 'LOADER_SET', 
    incActionConst = 'LOADER_INC'
) => {
    const initState = fromJS({n: 0, i: 0, finished: false});

    const updateState = (state) => {
        const newI = state.get ('i') + 1;
        const finished = newI === state.get ('n');

        return state.set ('i', newI).set ('finished', finished);
    }

    return {
        loader(loadCallbacks) {
            const n = loadCallbacks.length;

            loadCallbacks.forEach (element => element ());

            return (dispatch) => {
                dispatch({
                    type: setActionConst,
                    payload: n
                });
            };
        },

        reducer(state=initState, action) {
            switch (action.type) {
                case setActionConst:
                    return state.set ('n', action.payload);
        
                case incActionConst:
                    return updateState (state);
        
                default: 
                    return state;
            }
        },

        incLoadedCounter(dispatch) {
            return dispatch({
                type: incActionConst
            });
        },

        finished(stateKey) {
            return (state) => state[stateKey].get ('finished');
        },

    };
}
