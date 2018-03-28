import simpleLoadCtrl from '../../_libs/simpleLoadCtrl';
import { FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT } from '../constants/fetch';

const loadCtrl =  simpleLoadCtrl (FETCH_CTRL_SET_NUMBER, FETCH_CTRL_INCREMENT);

export const loader = loadCtrl.loader;
export const loadCtrlReducer = loadCtrl.reducer;
export const incLoadedCounter = loadCtrl.incLoadedCounter;
export const getLoadingFinished = loadCtrl.finished ('loadCtrl');  // pass the reducer name as key 
