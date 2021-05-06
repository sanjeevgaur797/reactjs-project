import ServerData from "../api/ServerData"

export const LOGIN ="LOGIN";
export const LOGINSUCCESS="LOGINSUCCESS";
export const LOGINFAILED="LOGINFAILED";

export const SIGNUP ="SIGNUP";
export const SIGNUPSUCCESS="SIGNUPSUCCESS";
export const SIGNUPFAILED="SIGNUPFAILED";




export function checklogin(body){
    return async dispatch=>{
        console.log("action called")
        dispatch({   //fetching

type:LOGIN,
payload:{},
        });
        
        await ServerData.checklogin(body,(data)=>{
            console.log("server data",data)
            dispatch({
                type:LOGINSUCCESS,
                payload:data,
            })
        },
            error=>{
                dispatch({
type:LOGINFAILED,
payload:error,
                })
            }
        )
    }
}


export function signup(body){
    return async dispatch=>{
        console.log("action called")
        dispatch({   //fetching

type:SIGNUP,
payload:{},
        });
        
        await ServerData.registerUser(body,(data)=>{
            console.log("server data",data)
            dispatch({
                type:SIGNUPSUCCESS,
                payload:data,
            })
        },
            error=>{
                dispatch({
type:SIGNUPFAILED,
payload:error,
                })
            }
        )
    }
}

