export const ADDTOCART = "ADDTOCART";
export const ADDTOCARTSUCCESS = "ADDTOCARTSUCCESS";
export const ADDTOCARTFAILED = "ADDTOCARTFAILED";
export const REMOVEFROMCARTSUCCESS="REMOVEFROMCARTSUCCESS";
export function addToCart(body) {
    return async dispatch => {
       
        var items = JSON.parse(await localStorage.getItem("cart"))
        if (items === null) {
            var arr = []
           
            arr.push({ data: body, count: 1 })
            await localStorage.setItem("cart", JSON.stringify(arr))

        }
        else {
            if (chkDuplicate(body.id)) {
                items.push({ data: body, count: 1 })
                await localStorage.setItem("cart", JSON.stringify(items))
            }
            

           
        }

        var new_data = JSON.parse(await localStorage.getItem("cart"))
        dispatch({
            type: ADDTOCARTSUCCESS,
            payload: { new_data }
        });
       function chkDuplicate(id) {
         
            for (let i = 0; i < items.length; i++) {
               
                if (id === items[i].data.id) {
                    items[i].count += 1
                    
                  localStorage.setItem("cart", JSON.stringify(items))
                    return false;
                }
            }
            return true;
        }


    }
}

export function removeFromCart(body) {
    
    return async dispatch => {
       
        var items = JSON.parse(await localStorage.getItem("cart"))
    for(let i=0;i<items.length;i++)
    {
        if(body.id ===items[i].data.id){
           if(items[i].count >1){
            items[i].count -=1;
           
            localStorage.setItem("cart",JSON.stringify(items))
       
           }
           else{
items.splice(i,1)
localStorage.setItem("cart",JSON.stringify(items))
       
           }
        }
    }   
    

    var new_data = JSON.parse(await localStorage.getItem("cart"))
       
        dispatch({
            type: REMOVEFROMCARTSUCCESS,
            payload: { new_data },
        });
                

    }   ;   
    }


    