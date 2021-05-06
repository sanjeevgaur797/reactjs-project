const { default: axios } = require("axios")

const callServer = {

request:async(method,url,body,success)=>{
    let config={
        method:method,
        headers:{
            //Accept:"application/json",
            Accept:"*",
            "Content-Type":"application/json",
            },
            //credentials:"include",
        }
        console.log("body is callserver",body)
        if(body !== ""){
            let newBody= JSON.stringify(body)

            config={ ...config,body:newBody }
            
        }
       
        await fetch(url,config)
        .then((res) =>res.json())
        .then(result =>{
           console.log("result in callserver",result)
            success(result);
            })

        },
        requestImage:async (url,body,success) => {
            let config={
                
                headers:{
                    //Accept:"application/json",
                    Accept:"*",
                    "Content-Type":"multipart/form-data",
                    },
                    //credentials:"include",
                }
      
        await axios.post(url,body,config)
       
        .then(result =>{
success(result.data);
        })
}

}



module.exports = callServer;