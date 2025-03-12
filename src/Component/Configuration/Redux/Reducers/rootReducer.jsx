import { combineReducers } from "redux";
import authReducer from "./Component/authReducer";
import userLoginReducer from "./Component/userLoginReducers";
import productReducers from "./Component/productReducer";
import productDetailsReducer from "./Component/productDetailsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: userLoginReducer,
    product: productReducers,
    productDetails: productDetailsReducer,
});

export default rootReducer;