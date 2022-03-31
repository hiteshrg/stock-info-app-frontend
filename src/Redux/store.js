import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleWare from "redux-thunk";
import rootReducer from "./Reducers/indexReducer";

const reducers = combineReducers({ rootReducer: rootReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));
export default store;