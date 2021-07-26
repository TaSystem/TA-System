import { combineReducers } from "redux";
import nisitReducer from './nisitReducer'

const rootReducer = combineReducers({
    nisit: nisitReducer
})

export default rootReducer