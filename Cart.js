import { Button, CircularProgress, Paper } from '@material-ui/core';
import { StylesContext, withStyles } from '@material-ui/styles';
import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { CartActions, ProductActions } from '../Actions';
import { Base_url } from '../api/serverconfig';




class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
         
            addedProducts:[],
            cartLength:0,
            payment:{
               
            }
        }

    }
  
    
    async componentWillMount() {
        var items = JSON.parse(await localStorage.getItem('cart'));
        if(items !==null)
        {
            this.setState({addedProducts:items})
            this.getPayment()
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.AddToCartSuccess) {
            
            this.setState({addedProducts:nextProps.AddToCartInfo.details.new_data})
           

        }
        if (nextProps.RemoveFromCartSuccess) {
            this.setState({addedProducts:nextProps.RemoveFromCartInfo.details.new_data})

        }
        if (nextProps.AllProductsSuccess) {
            console.log(nextProps.AllProductsInfo.details)
            this.setState({ rows: nextProps.AllProductsInfo.details.result })

        }
    }
    checkItemCount =(id)=>{
        var items=this.state.addedProducts;
        for(let i=0;i<items.length;i++){
            if(id===items[i].data.id){
                return items[i].count
            }
        }
       
 
     }

     getPayment = () =>{
         var items = [...this.state.addedProducts]
         var mrp = 0,discount=0,total=0

       for(let i=0;i<items.length;i++){
           const item= items[i];
           mrp +=item.data.price * item.count
           discount +=item.data.discount * item.count
            total += (item.data.price * item.count)-(item.data.discount * item.count)
           
        }
        this.discount = discount
        this.total = total
        return mrp;
     }
render() {
    return (
        <div>
         <h2>My Cart({this.state.cartLength})</h2>
         { this.state.addedProducts.length > 0 ?
         <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <div style={{width:'60%'}}>
         {
                        this.state.addedProducts.map((item) => (
                            <Paper style={{ width: "95%", margin: 10, padding: 15,display:'flex',flexDirection:'row' }}>
                                <img alt='showimage' src={`${Base_url}/images/${item.data.image}`} style={{ width:100, height: 100, padding: 5, borderRadius: 5 }} />
                            {/* data show */}
                                <div style={{margin:8}}>
                                <div style={{ fontSize: 15, fontWeight: 'bold' }}>{item.data.name}</div>
                                <div style={{ fontSize: 15, fontWeight: 'bold' }}>{item.data.description}</div>
                               <div style={{display:'flex',flexDirection:'row',}}>
                               <div style={{ fontSize: 15,paddingLeft:12  }}>₹{item.data.price +".00"}</div>
                                <div style={{ fontSize: 15, fontWeight: 'lighter',paddingLeft:12  }}>MRP  <s>₹
 {parseInt(item.data.price) + parseInt(item.data.discount) + ".00"}</s></div>
                               
                                <div style={{ fontSize: 13, paddingLeft:12, color: 'green' }}>save ₹ {item.data.discount + '.00'}</div>
</div></div>
                                 {/* add or remove button cart button part */}
                                 
                                    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "flex-end", backgroundColor: 'white', alignItems:'flex-end',
                                    flex:1}} >
                                    <div style={{
                                       backgroundColor: '#2980b9',
                                        borderRadius: 50, width: 30, height: 30, 
                                        justifyContent: 'center', alignItems: 'center', 
                                        
                                    }} onClick={() => { this.props.removeFromCart(item.data) }}><div style={{fontSize:30,color:"white",textAlign:"center",
                                    marginTop:-8}}> -  </div></div>
                                    <div style={{
                                        fontSize: 20, 
                                    }}>
                                    {this.checkItemCount(item.data.id)}</div>
                                    <div style={{
                                        backgroundColor: '#2980b9',
                                        borderRadius: 50, width: 30, height: 30, 
                                        justifyContent: 'center', alignItems: 'center', 
                                    }} onClick={() => { this.checkItemCount(item.data.id) != item.data.stock ? this.props.addToCart(item.data) :alert("not enough stock")}}>
                                     <div style={{fontSize:30,color:"white",textAlign:'center'
                                     ,marginTop:-5}}>+ </div> </div></div>
                            </Paper>






                        ))}</div>
                        <div style={{width:"40%",margin:10,}}>
                            <Paper  style={{width:"100%",padding:15,}}>
                            <div style={{fontSize:16,fontWeight:"bold",margin:10}}> Payment Details</div>
                            <div style={{padding:10}}>
{this.state.addedProducts.map(item=>(
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',borderBottom:"0.5px solid black",margin:5,padding:5}}>
    <div>{item.data.name }</div>
    <div>{item.data.price + ".00"} x {item.count} = {item.data.price*item.count + ".00"}</div>
    </div>
))}</div>
<div>MRP:{this.getPayment()}</div>
<div>Discount:{this.discount}</div>
<div>total:{this.total}</div>
<div>You`re Saving:{this.discount}</div>



                            </Paper>
                            <Link to="/placeorder" style={{textDecoration:'none'}}>
                            <Button style={{marginTop:25,marginLeft:150,display:'flex',flexDirection:'row',justifyContent:'center'
                            ,}}variant="contained" color="primary" onClick={()=>{ }}>Place Order</Button>
                            </Link>
                            </div>
                       
                   </div> :"Nothing in your cart"}
        </div>
    )
}

}

function mapStateToProps(state) {
    return {
        state,
        AddToCartInfo: state.addToCart,
        AddToCartSuccess: state.addToCart.success,
        AddToCartFetching: state.addToCart.fetching
,

        RemoveFromCartInfo: state.removeFromCart,
        RemoveFromCartSuccess: state.removeFromCart.success,
        RemoveFromCartFetching: state.removeFromCart.fetching



    };
}

export default (compose(connect(mapStateToProps, {
    ...CartActions,...ProductActions,
}))(Cart))