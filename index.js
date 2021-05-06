import {combineReducers} from "redux";
import {reducer as formreducer} from "redux-form";
import {addToCart,removeFromCart} from './CartReducer';
import {allProducts,placeorder} from "./ProductReducer";
import {checklogin,signup} from "./LoginReducer";
const appReducer=combineReducers({
    form:formreducer,
    addToCart,
    allProducts,
    removeFromCart,
    placeorder,
    signup,
    checklogin
    
})
const rootReducer = (state,action)=>{
if(action.type === "CLEAR_APP_STATE"){
    state = undefined
}
return appReducer(state,action);
};
export default rootReducer;