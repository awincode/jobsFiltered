import * as reducer from './ui';
import * as types from '../constants/ui';

import { Map } from 'immutable';

describe ('ui modal reducer', () => {
    describe ('initial state', () => {
        const initStateModal = Map({
            isOpen: false,
            type: ''
        });

        it ('should return false', () => {
            expect (reducer.modal (undefined, {})).toEqual (initStateModal);
        })
    })

    describe ('set isOpen', () => {
        // --> rewrite SET_MODAL_ISOPEN to CLOSE_MODAL
        describe ('as false', () => {
            it ('should return false', () => {
                expect (reducer.modal (undefined, {
                    type: types.SET_MODAL_ISOPEN,
                    payload: false
                }).get('isOpen')).toEqual (false);
            })
        });
        
    });

    describe ('set modal type', () => {
        describe('as city', () => {
            it ('should return city', () => {

                expect (reducer.modal (undefined, {
                    type: types.SET_MODAL_TYPE,
                    payload: 'city'
                }).get('type')).toEqual ('city');
            });
        });
    });

    describe('result', () => {
        describe('set result detail id', () => {
            it  ('should return', () => {
                expect (reducer.result (undefined, {
                    type: types.SET_RESULT_ID,
                    payload: 12312212
                }).get ('id')).toEqual (12312212);
            });
        });
      
    });
    
    
});