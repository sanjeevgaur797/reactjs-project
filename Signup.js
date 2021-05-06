import { Button, Snackbar, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import MuiAlert from "@material-ui/lab/Alert"
import { render } from "@testing-library/react";
import {useState} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { LoginAction } from "../Actions";
import ServerData from "../api/ServerData";
import { signup } from "../Reducers/LoginReducer";

// import { registerUser } from "../api/ServerData";

class Signup extends Comment(){

  constructor(props) {
    super(props);
    this.state = {
    
     name:'',
     phone:'',
     password:'',
     snackbar:{text:'',severcity:'',open:false}
        
           
        }
    }

  
//     async    UNSAFE_componentWillMount() {
//       var items = JSON.parse(await localStorage.getItem('cart'));
//       if(items !==null)
//       {
//           this.setState({addedProducts:items})
         
//   }

// }

UNSAFE_componentWillReceiveProps(nextProps) {
if(nextProps.signpInfoSuccess){
    var result=nextProps.signupInfo.details
    if(result.code===200){
       this.setstate({snackbar:{text:"Record Submitted",severity:"success",open:true},  setname:'',
       setphone:'',
       password:''})
    }
    if(result.code===404){
      this.setstate({snackbar:{text:"Record not Submitted",severity:"error",open:true},  setname:'',
      setphone:'',
      password:''})
    }

    if(result.code===114){
      this.setstate({snackbar:{text:"Number Already Registered",severity:"error",open:true},  setname:'',
      setphone:'',
      password:''})
    }
}
}

   validateBody=()=>{
    if(this.state.name==='')
    {
      this.setstate({snackbar:{text:"Name Can Not Be Empty ",severity:"warning",open:true}})
    }
    else if(this.state.phone.length!== 10){
      this.setstate({snackbar:{text:"Number Can Not Be Empty ",severity:"warning",open:true}})
    }
    else if(this.state.password===''){
      this.setstate({snackbar:{text:"password Can Not Be Empty ",severity:"warning",open:true}})
    }
    else{
      this.props.signup({name:this.state.name,phone:this.state.phone,password:this.state.password})
    }

  }
   
   render(){

    return(

       


        <div style={{flexDirection:"column",display:"flex",alignItems:"center"}}><h2>Signup</h2>
         
            <TextField value={this.state.name} onChange={(event)=>{this.setstate({name:event.target.value})}} id="outlined-basic" label="Name" variant="outlined" /><br /><br />

            <TextField value={this.state.phone} onChange={(event)=>{this.setstate({phone:event.target.value})}}  id="outlined-basic" label="phone" variant="outlined" type="number" /><br /><br />
          
           <TextField value={this.state.password} onChange={(event)=>{this.setstate({password:event.target.value})}}  id="outlined-basic" label="Password" variant="outlined" type="password" />

            <Button onClick={()=>{this.validateBody()}} style={{margin:10}} variant="contained" color="primary">
  Submit
</Button>
    
    <Snackbar open={this.state.snackbar.open} autoHideDuration={6000} onClose={()=>this.setstate({snackbar:{text:"",severity:"",open:false}})}>

        <Alert onClose={()=>this.setstate({snackbar:{text:"",severity:"",open:false}})} severity={this.state.snackbar.severity} >
         {this.state.snackbar.text}
        </Alert>
        </Snackbar>
        </div>
    )}
    }

    function mapStateToProps(state) {
      return {
          state,
          
  signupInfo:state.signup,
  signupInfoSuccess:state.signup.success,
  signupInfoFetching:state.signup.fetching,
  
      };
  }
  
  export default (compose(connect(mapStateToProps, {
      ...LoginAction
  }))(Signup))
    
