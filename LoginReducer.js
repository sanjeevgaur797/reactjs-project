import {
    LOGIN,
LOGINSUCCESS,
LOGINFAILED,
SIGNUP,
SIGNUPSUCCESS,
SIGNUPFAILED,
    } from "../Actions/LoginAction"
    
const initialState={ fetching:false,success:false,error:false};

    export function checklogin (state=initialState, action){
        switch (action.type){
            case  LOGIN : {
                return Object.assign({},state,{fetching:true,success:false,error:false}
                );}
                case LOGINSUCCESS :{
                    console.log(action.payload);
                    return Object.assign({},state,{fetching:false,success:true,error:false},
                        {details:action.payload},
                    );
                }
                   
                case LOGINFAILED :{
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
        
    
            export function signup(state=initialState, action){
                switch (action.type){
                    case  SIGNUP : {
                        return Object.assign({},state,{fetching:true,success:false,error:false}
                        );}
                        case SIGNUPSUCCESS :{
                            console.log(action.payload);
                            return Object.assign({},state,{fetching:false,success:true,error:false},
                                {details:action.payload},
                            );
                        }
                           
                        case SIGNUPFAILED :{
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
                
        