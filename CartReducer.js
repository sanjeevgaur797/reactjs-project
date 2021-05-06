
import {ADDTOCART,ADDTOCARTSUCCESS, REMOVEFROMCARTSUCCESS} from "../Actions/CartAction";

const initialState={ fetching:false,success:false,error:false};
export function addToCart(state=initialState, action){
switch (action.type){
    case  ADDTOCART : {
        return Object.assign({},state,{fetching:true,success:false,error:false}
        );}
        case ADDTOCARTSUCCESS :{
            console.log("add tocart success reducer",action.payload);
            return Object.assign({},state,{fetching:false,success:true,error:false},
                {details:action.payload},
            );
        }
            
        default :{
            return initialState;
        }
        }
    }
    //removefrom cart so create reducer

   
export function removeFromCart(state=initialState, action){
switch (action.type){
 
        case REMOVEFROMCARTSUCCESS :{
           // console.log("add tocart success reducer",action.payload);
            return Object.assign({},state,{fetching:false,success:true,error:false},
                {details:action.payload},
            );
        }
            
        default :{
            return initialState;
        }
        }
    }
    