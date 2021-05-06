import { Button, TextField } from "@material-ui/core";

export default function ForgetPassword(){
    return(
        <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} ><h2 style={{margin:10}}>Login</h2>
            <TextField style={{margin:10}} id="outlined-basic" label="Phone Number *" variant="outlined" />
            <TextField style={{margin:10}} id="outlined-basic" label="Create  Password *" type="password" variant="outlined" />
            <TextField style={{margin:10}} id="outlined-basic" label="Confirmed Password *" type="password" variant="outlined" />

            
            <Button style={{margin:10}} variant="contained" color="primary">
  Login
</Button>
        </div>
    )
}