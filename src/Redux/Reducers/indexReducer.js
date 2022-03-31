import { combineReducers } from 'redux';
import StockReducer from './stockReducer';

const rootReducer = combineReducers({
    stockReducer: StockReducer
});

export default rootReducer;