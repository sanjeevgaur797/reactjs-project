import { Button, TextField } from "@material-ui/core";

export default function Advertisement(){
    return(<div>
        <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} ><h2 style={{margin:10}}></h2>
          <h1>Advertisement</h1>
            <TextField style={{margin:10}} id="outlined-basic" label="Email Id *" variant="outlined" />
            <TextField style={{margin:10}} id="outlined-basic" label="Password *" type="password" variant="outlined" />
            <Button style={{margin:10}} variant="contained" color="primary">
  Login
</Button>
        </div>
        </div>
    )
}