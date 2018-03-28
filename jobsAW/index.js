import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createReduxStore from '../_libs/createReduxStore';
import reducer from './reducers';
import Container from './containers/fetch';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const store = createReduxStore(reducer);

render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('root')
);