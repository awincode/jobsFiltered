import { SET_MODAL_ISOPEN, SET_MODAL_TYPE, SET_RESULT_ID } from '../constants/ui';

export const setModalIsOpen = (open) => ({
    type: SET_MODAL_ISOPEN,
    payload: open
});

export const setModalType = (typeName) => ({
    type: SET_MODAL_TYPE,
    payload: typeName
});

export const setResultId = (id) => ({
    type: SET_RESULT_ID,
    payload: id
});


export const closeModal = () => setModalIsOpen(false);