import { combineReducers } from "redux";
import authReducer from "./Component/authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;