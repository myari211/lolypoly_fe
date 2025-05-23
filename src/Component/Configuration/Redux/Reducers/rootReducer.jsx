import { combineReducers } from "redux";
import authReducer from "./Component/authReducer";
import userLoginReducer from "./Component/userLoginReducers";
import productReducers from "./Component/productReducer";
import productDetailsReducer from "./Component/productDetailsReducer";
import { productStateReducer } from "../Action/productSlice";
import provinceReducer from "./Component/provinceReducer";
import cityReducer from "./Component/cityReducer";
import villageReducer from "./Component/villageReducer";
import districtReducer from "./Component/districtReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: userLoginReducer,
    product: productReducers,
    productDetails: productDetailsReducer,
    productCheckout: productStateReducer,
    province: provinceReducer,
    city: cityReducer,
    village: villageReducer,
    district: districtReducer,
});

export default rootReducer;