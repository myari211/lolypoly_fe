import { combineReducers } from "redux";
import authReducer from "./Component/authReducer";
import userLoginReducer from "./Component/userLoginReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: userLoginReducer,
});

export default rootReducer;