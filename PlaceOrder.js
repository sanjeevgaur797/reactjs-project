import { Button, CircularProgress, Paper, TextField } from '@material-ui/core';
import { StylesContext, withStyles } from '@material-ui/styles';
import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CartActions, ProductActions } from '../Actions';
import { Base_url } from '../api/serverconfig';




class PlaceOrder  extends Component {

    constructor(props) {
        super(props);
        this.state = {
         addedProducts:[],
         name:'',
         phone:'',
         address:''
            
               
            }
        }

    
  
    async    UNSAFE_componentWillMount() {
            var items = JSON.parse(await localStorage.getItem('cart'));
            if(items !==null)
            {
                this.setState({addedProducts:items})
               
        }
    
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.placeorderInfoSuccess){
          var response=nextProps.placeorderInfo.details
          if(response.code===200){
              alert("order place")
          }
          if(response.code===404){
              alert("somthing went wrong")
          }
      }
    }
    validateData = () =>{
        if(this.state.name ===''){
            alert("Name can not be empty")
        } else if(this.state.number === "" || this.state.phone.length !== 10 ){
            alert("Invalid Phone Number")
        } else if(this.state.address === ""){
            alert("Address can not be empty")
        }
        else{
let body={
    name:this.state.name,
    phone:this.state.phone,
    address:this.state.address,
items:JSON.stringify(this.state.addedProducts)
}
console.log(body)
           //alert(JSON.stringify(this.state.addedProducts))
        this.props.placeorder(body)
        }
    }



   
render() {
    return (
        <div>
         <TextField id="standard-basic" label="Name" variant="outlined"   onChange={(event)=>{ this.setState({name:event.target.value})}}/><br /><br />
  <TextField id="filled-basic" type="number"  inputProps={{maxLength:10}} label="Phone" variant="outlined" value={this.state.phone}  
   onChange={(event)=>{ {event.target.value.length <=10 ? this.setState({phone:event.target.value}):this.setState({phone:this.state.phone})}}} /> <br /><br />
  <TextField id="outlined-basic" label="Address" variant="outlined"    onChange={(event)=>{ this.setState({address:event.target.value})}} /> <br /><br />

   <Button style={{marginTop:25,marginLeft:150,display:'flex',flexDirection:'row',justifyContent:'center'}} 
  variant="contained" color="primary" onClick={ ()=>{this.validateData()}} >Check Out</Button>
     
     </div>
        )
}
}

function mapStateToProps(state) {
    return {
        state,
        
placeorderInfo:state.placeorder,
placeorderInfoSuccess:state.placeorder.success,
placeorderInfoFetching:state.placeorder.fetching,

    };
}

export default (compose(connect(mapStateToProps, {
    ...CartActions,...ProductActions,
}))(PlaceOrder))