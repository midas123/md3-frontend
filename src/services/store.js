import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default initialState => {
    initialState = JSON.parse(window.localStorage.getItem('state')) || initialState;
    
    const middleware = [thunk];
    const enhancer = compose(applyMiddleware(...middleware));
    const store = createStore(rootReducer, initialState, enhancer);
    

    store.subscribe(() => {
        const state = store.getState();
        const persist = {
            cart: state.cart
        };

        window.localStorage.setItem('state', JSON.stringify(persist));
    })

    return store;
}