import { combineReducers } from "redux"

import user from "./userReducer"
import data from "./dataReducer"

export default combineReducers({
    user,
    data,
})