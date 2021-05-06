import { Button, CircularProgress, Paper, TextField } from '@material-ui/core';
import { StylesContext, withStyles } from '@material-ui/styles';
import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CartActions, LoginAction, ProductActions } from '../Actions';
import { Base_url } from '../api/serverconfig';


//export default function Login(){
    class Login  extends Component {

        constructor(props) {
            super(props);
            this.state = {
            
            
             phone:'',
             password:''
                
                   
                }
            }
            
    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if(nextProps.checkloginSuccess){
            var result=nextProps.checkloginInfo.details
            if(result.code===200){
                
                alert( "Login Successfully")
              
                  this.props.history.push("/")
            }
            if(result.code===103){
                alert("Invalid Phone Or Password")
            }
        }
      }
  
            validate=()=>{
//alert("hello")
if(this.state.phone ===""){
    alert("Please Enter Phone Number ")
}
else if(this.state.password === ""){
    alert("Please Enter Your Password")
}
else{
    // alert(JSON.stringify({pho:this.state.phone,pass:this.state.password}))
    // this.props.history.push("/")
    
    this.props.checklogin({
        phone:this.state.phone,
        password:this.state.password
    })
}
            }
            render() {

return(
        <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} ><h2 style={{margin:10}}>Login</h2>
           <TextField id="filled-basic" type="number"  inputProps={{maxLength:10}} label="Phone" variant="outlined" value={this.state.phone}  
   onChange={(event)=>{ {event.target.value.length <=10 ? this.setState({phone:event.target.value}):this.setState({phone:this.state.phone})}}} /> <br /><br />
            <TextField style={{margin:10}} id="outlined-basic" label="Password *" type="password" variant="outlined" onChange={(event)=>{this.setState({password:event.target.value})}} />
            <Button style={{margin:10}} variant="contained" color="primary" onClick={()=>{this.validate()}}>
  Login
</Button>
        </div>
    )}
}
function mapStateToProps(state) {
    return {
        state,
        
checkloginInfo:state.checklogin,
checkloginSuccess:state.checklogin.success,
checkloginFetching:state.checklogin.fetching,

    };
}
    
export default (compose(connect(mapStateToProps, {
   ...LoginAction
}))(Login))