import ServerData from "../api/ServerData"

export const ALLPRODUCT="ALLPRODUCT";
export const ALLPRODUCTSUCCESS="ALLPRODUCTSUCCESS";
export const ALLPRODUCTFAILED="ALLPRODUCTFAILED";


export const PLACEORDER="PLACEORDER";
export const PLACEORDERSUCCESS="PLACEORDERSUCCESS";
export const PLACEORDERFAILED="PLACEORDERFAILED";


export function allProducts(){
    return async dispatch=>{
        console.log("action called")
        dispatch({   //fetching

type:ALLPRODUCT,
payload:{},
        });
        
        await ServerData.getData((data)=>{
            console.log("server data",data)
            dispatch({
                type:ALLPRODUCTSUCCESS,
                payload:data,
            })
        },
            error=>{
                dispatch({
type:ALLPRODUCTFAILED,
payload:error,
                })
            }
        )
    }
}

export function placeorder(body){
    return async dispatch=>{
        console.log("action called sanjeev gaur")
        dispatch({   //fetching

type:PLACEORDER,
payload:{},
        });
        
        await ServerData.placeorder(body,(data)=>{
            console.log("sanjeev server data",data)
            dispatch({
                type:PLACEORDERSUCCESS,
                payload:data,
            })
        },
            error=>{
                dispatch({
type:PLACEORDERFAILED,
payload:error,
                })
            }
        )
    }
}