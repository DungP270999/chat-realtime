import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../Reducers/index";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log("Error save to local storage!");
        console.log(e);
    }
}

// load from local storage
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return {};
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

const preloadedState = loadFromLocalStorage();

const store = createStore(rootReducer, preloadedState, compose(
    applyMiddleware(thunkMiddleware),

    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => {
        return f;
    }
));

store.subscribe(() => {
    const state = store.getState();

    saveToLocalStorage(state);
});

export default store;

