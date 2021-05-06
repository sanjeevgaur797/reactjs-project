import {
ALLPRODUCT,
ALLPRODUCTSUCCESS,

PLACEORDER,
PLACEORDERSUCCESS,
PLACEORDERFAILED,

} from "../Actions/ProductActions"

const initialState={ fetching:false,success:false,error:false};
export function allProducts(state=initialState, action){
switch (action.type){
    case  ALLPRODUCT : {
        return Object.assign({},state,{fetching:true,success:false,error:false}
        );}
        case ALLPRODUCTSUCCESS :{
            console.log(action.payload);
            return Object.assign({},state,{fetching:false,success:true,error:false},
                {details:action.payload},
            );
        }
           
        default :{
            return initialState;
        }
        }
    }
    

    export function placeorder(state=initialState, action){
        switch (action.type){
            case  PLACEORDER : {
                return Object.assign({},state,{fetching:true,success:false,error:false}
                );}
                case PLACEORDERSUCCESS :{
                    console.log(action.payload);
                    return Object.assign({},state,{fetching:false,success:true,error:false},
                        {details:action.payload},
                    );
                }
                   
                case PLACEORDERFAILED :{
                    console.log(action.payload);
                    return Object.assign({},state,{fetching:false,success:false,error:true},
                        {details:action.payload},
                    );
                }
                default :{
                    return initialState;
                }
                }
            }
            