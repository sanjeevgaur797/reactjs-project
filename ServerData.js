import Server from "./callServer";
import {Base_url }from "./serverconfig"

// this is connect for react or redux or export remove and function create
const ServerData={

   registerUser :(body,success)=>{

    Server.request("Post",`${Base_url}/users/signup`,body,(result)=>{
  console.log("result in action",result)
  success(result);
  })
},
   submitData :(body,success)=>{
  console.log(" data in action",JSON.stringify(body))
    Server.requestImage(`${Base_url}/addproduct`,body,(result)=>{
  // console.log("result in action",result)
  success(result);
   })
  }
  ,
  getData :(success)=>{
    
      Server.request('GET',`${Base_url}/showproducts`,'',(result)=>{
    // console.log("result in action",result)
    success(result);
     })
    }
  ,
    EditData :(body,success) =>{
    
      Server.request('post',`${Base_url}/editproducts`,body,(result)=>{
    //console.log("result in action",result)
    success(result);
     })
    },
  
    sendImage :(body,success) =>{
    
      Server.requestImage(`${Base_url}/updateimage`,body,(result)=>{
    //console.log("result in action",result)
    success(result);
     })
    },
    placeorder : async (body,success) =>{
    
      await Server.request('post',`${Base_url}/users/placeorder`,body,(result)=>{
    //console.log("result in action",result)
    success(result);
     })
    }
,
checklogin : async (body,success) =>{
    
  await Server.request('post',`${Base_url}/users/checklogin`,body,(result)=>{
//console.log("result in action",result)
success(result);
 })
},
signup : async (body,success) =>{
    
  await Server.request('post',`${Base_url}/users/signup`,body,(result)=>{
//console.log("result in action",result)
success(result);
 })
}

}

export default ServerData;
//*this is only for react js connect*
// export const registerUser =(body,success)=>{

//   Server.request("Post",`${Base_url}/user/register`,body,(result)=>{
// console.log("result in action",result)
// success(result);
// })

// }
// export const submitData =(body,success)=>{
// console.log(" data in action",JSON.stringify(body))
//   Server.requestImage(`${Base_url}/addproduct`,body,(result)=>{
// // console.log("result in action",result)
// success(result);
//  })
// }

// export const getData =(success)=>{
  
//     Server.request('GET',`${Base_url}/showproducts`,'',(result)=>{
//   // console.log("result in action",result)
//   success(result);
//    })
//   }

//   export const EditData =(body,success) =>{
  
//     Server.request('post',`${Base_url}/editproducts`,body,(result)=>{
//   //console.log("result in action",result)
//   success(result);
//    })
//   }

//   export const sendImage =(body,success) =>{
  
//     Server.requestImage(`${Base_url}/updateimage`,body,(result)=>{
//   //console.log("result in action",result)
//   success(result);
//    })
//   }