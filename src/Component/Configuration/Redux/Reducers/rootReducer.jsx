import { combineReducers } from "redux";
import authReducer from "./Component/authReducer";
import userLoginReducer from "./Component/userLoginReducers";
import productReducers from "./Component/productReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: userLoginReducer,
    product: productReducers,
});

export default rootReducer;