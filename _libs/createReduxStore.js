import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// thunk necessary for async fetching
export default (reducer, middleWares=[thunk]) => {
    if (process.env.NODE_ENV !== 'production') {
        middleWares.push(createLogger());
    }
    
    const store = createStore(
        reducer,
        applyMiddleware(...middleWares)
    );

    return store;
};