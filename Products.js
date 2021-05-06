import { AppBar, Box, Button, makeStyles,  Tab, Tabs, TextField, Typography , Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, CircularProgress, Modal, DialogTitle, DialogContent, DialogContentText, Dialog, DialogActions} from "@material-ui/core";

import { useState ,useEffect } from "react";
import ServerData, { submitData ,getData, EditData,sendImage} from "../api/ServerData";
import {Base_url }from "../api/serverconfig"

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
//   TabPanel.PropTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'Discount', minWidth: 100 },
    {
      id: 'population',
      label: 'Category',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Image',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Price',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'Description',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'density',
        label: 'Stock',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'density',
        label: 'Seller',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'density',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
      },
  ];
  
  
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  
  const useStyles = makeStyles((theme) =>({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    paper: {
        position: 'absolute',
        width: 550,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));


export default function Products(){
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalStyle] = useState(getModalStyle);

    const[name,setName]=useState('')
    const[category,setCategory]=useState('')
    const[stock,setStock]=useState(0)
    const[price,setPrice]=useState(0)
    const[discount,setDiscount]=useState(0)
    const[image,setImage]=useState('')
    const[description,setDescription]=useState('')
    const[seller,setSeller]=useState('')
    const [value, setValue] = useState(0);
    const [rows,setrows]= useState([]);
    const [showLoader,setLoader]=useState(true)
    const [openModal,setOpenModal]=useState(false);

    //edit states
    const[nameEdit,setNameEdit]=useState('')
    const[categoryEdit,setCategoryEdit]=useState('')
    const[stockEdit,setStockEdit]=useState(0)
    const[priceEdit,setPriceEdit]=useState(0)
    const[discountEdit,setDiscountEdit]=useState(0)
    const[imageEdit,setImageEdit]=useState({type:'server',src:null,image:null})
    const[descriptionEdit,setDescriptionEdit]=useState('')
    const[sellerEdit,setSellerEdit]=useState('')
    const[idEdit,setidEdit]=useState('')
    const [deleteCnf,setdeleteCnf]=useState(false)
   
    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit Record</h2>

          <div style={{borderRadius:20,border:"3px solid green",alignItems:'center',padding:10}}>

          <img alt='imageedit' src={imageEdit.type==='server'?`${Base_url}/images/${imageEdit.src}`:imageEdit.src} style={{width:85,height:75,borderRadius:5,border:"3px solid cyan",alignItems:'center',padding:0}}/>
             
              <TextField style={{margin:10,width:232}} id="outlined-basic"  variant="outlined"  type='file' onChange={(event) =>{setImageEdit({type:'local',src:URL.createObjectURL(event.target.files[0]),image:event.target.files[0]}) } }/>

              <Button style={{display:"flex",alignItems:"center",justifyContent:"center",marginLeft:100}} variant="contained" color="primary" onClick={()=> updateImage()}>
    Change
  </Button>
  </div><br />
          <div style={{flexDirection:"row",display:"flex",alignItems:"center"}} >
          
              <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} >
              
              <TextField style={{margin:10}} id="outlined-basic" label="Name *" variant="outlined" onChange={(event) =>{setNameEdit(event.target.value)}} value={nameEdit} />
     
              <TextField style={{margin:10,width:220,}}  label="Category *" type="text" value={categoryEdit}  variant="outlined" onChange={(event) =>{setCategoryEdit(event.target.value)}} />
                     
              <TextField style={{margin:10}} id="outlined-basic" label="stock *" type="number" variant="outlined" value={stockEdit}  onChange={(event) =>{setStockEdit(event.target.value)}} />
              
              <TextField style={{margin:10}} id="outlined-basic" label="price *" type="number" variant="outlined" value={priceEdit} onChange={(event) =>{setPriceEdit(event.target.value)}} />
              </div>
              <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} >
              <TextField style={{margin:10}} id="outlined-basic" label="discount *" type="number" variant="outlined" value={discountEdit} onChange={(event) =>{setDiscountEdit(event.target.value)}} />
             
              
  
              <TextField style={{margin:10}} id="outlined-basic" label="description *"  variant="outlined" value={descriptionEdit} onChange={(event) =>{setDescriptionEdit(event.target.value)}} />
              <TextField style={{margin:10}} id="outlined-basic" label="seller *"  variant="outlined" value={sellerEdit} onChange={(event) =>{setSellerEdit(event.target.value)}} />
              </div>
              </div>
              <Button style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1,marginLeft:250}} variant="contained" color="primary" onClick={()=> validateDataforEdit('Update')}>
    Update
  </Button>
  <Button style={{display:"flex",alignItems:"center",justifyContent:"center",marginLeft:100,marginTop:-35}} variant="contained" color="secondary" onClick={()=> setdeleteCnf(true)}>
    Delete
  </Button>
  <Dialog
        open={deleteCnf}
        // TransitionComponent={TransitionEvent}
       
        onClose={()=>setdeleteCnf(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Please Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do You Want to Delete This Record
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setdeleteCnf(false)} color="primary">
            No
          </Button>
          <Button onClick={() =>validateDataforEdit('delete')} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  
              </div>
          
      );

      const getDataCall = () =>{
      ServerData.getData((result) =>{
        if(result.code ===200){
        
            setrows(result.result)
            setLoader(false)
        }
        else{
            alert("Somthing Went Wrong")
        }
            })
          }

useEffect(function()  {
  getDataCall();
    
}, [])




    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    const validateData = ()=>{

        var form = new FormData();
        form.append('name',name)
        form.append('stock',stock)
        form.append('price',price)
        form.append('description',description)
        form.append('seller',seller)
        form.append('discount',discount)
        form.append('category',category)
        form.append('image',image)
        
        ServerData.submitData(form,(result) =>{
            console.log(result)
            
            if(result.code === 200){
                alert("success")
                setName('')
                setDiscount(0)
                setStock(0)
                setImage('')
                setSeller('')
                setDescription('')
                setCategory('')
                setPrice(0)

                getDataCall();
            }
            else{
            alert("failure")
            }
        })

    }



    const validateDataforEdit = (btn)=>{

     let body = {
       name:nameEdit,
       discount:discountEdit,
       category:categoryEdit,
       price:priceEdit,
       description:descriptionEdit,
       stock:stockEdit,
       seller:sellerEdit,
       btn:btn,
       id:idEdit
     }
      
  //     EditData(body,(result) =>{
  //         console.log(result)
          
  //         if(result.code === 200){
  //           alert("success")
  //             setNameEdit('')
  //             setDiscountEdit(0)
  //             setStockEdit(0)
  //             setImageEdit('')
  //             setSellerEdit('')
  //             setDescriptionEdit('')
  //             setCategoryEdit('')
  //             setPriceEdit(0)
  //           setdeleteCnf(false)
  //             getData((result) =>{
  //                 if(result.code ===200){
  //                   getDataCall();
  //                    setOpenModal(false)
                      
  //                 }
  //                 else{
  //                     alert("Somthing Went Wrong")
  //                     setOpenModal(false)
  //                 }
  //                     })
  //         }
  //         else{
  //         alert("failure")
  //         }
  //     })

   }
const fillData =(row)=>{
  setidEdit(row.id)
  setNameEdit(row.name)
  setCategoryEdit(row.category)
  setStockEdit(row.stock)
  setPriceEdit(row.price)
  setDiscountEdit(row.discount)
  setImageEdit({type:'server',src:row.image})
  setDescriptionEdit(row.description)
  setSellerEdit(row.seller)
setOpenModal(true);
}
const updateImage=()=>{
  var form = new FormData()
  form.append('id',idEdit)
  form.append('image',imageEdit.image)

  ServerData.sendImage(form,(result)=>{
    if(result.code ===200){
      getDataCall();
       setOpenModal(false)
        setdeleteCnf(false)
    }
    else{
        alert("Somthing Went Wrong")
        setOpenModal(false)
        setdeleteCnf(false)
    }
        })
  
}


    return(
        <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} >
        
        <AppBar position="static" style={{marginTop:-24}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        
          <Tab label="Add Product" {...a11yProps(0)} />
          <Tab label="Display All" {...a11yProps(1)} />
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      
                      
                      
      <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} >
        
      <h1 style={{margin:10}}>Products</h1>
         <br />
        <div style={{flexDirection:"row",display:"flex",alignItems:"center"}} >
            <div style={{flexDirection:"column",display:"flex",alignItems:"center"}} >
            <TextField style={{margin:10}} id="outlined-basic" label="Name *" variant="outlined" onChange={(event) =>{setName(event.target.value)}} value={name} />
   
            <TextField style={{margin:10,width:220,}}  label="Category *" type="text" value={category}  variant="outlined" onChange={(event) =>{setCategory(event.target.value)}} />
                   
            <TextField style={{margin:10}} id="outlined-basic" label="stock *" type="number" variant="outlined" value={stock}  onChange={(event) =>{setStock(event.target.value)}} />
            
            <TextField style={{margin:10}} id="outlined-basic" label="price *" type="number" variant="outlined" value={price} onChange={(event) =>{setPrice(event.target.value)}} />
            </div>
            <div style={{flexDirection:"column",display:"flex",alignItems:"center"}}>
            <TextField style={{margin:10}} id="outlined-basic" label="discount *" type="number" variant="outlined" value={discount} onChange={(event) =>{setDiscount(event.target.value)}} />
           
            <TextField style={{margin:10,width:232}} id="outlined-basic"  variant="outlined"  type='file' onChange={(event) =>{setImage(event.target.files[0]) } }/>

            <TextField style={{margin:10}} id="outlined-basic" label="description *"  variant="outlined" value={description} onChange={(event) =>{setDescription(event.target.value)}} />
            <TextField style={{margin:10}} id="outlined-basic" label="seller *"  variant="outlined" value={seller} onChange={(event) =>{setSeller(event.target.value)}} />
            </div>
            </div>
            <Button style={{margin:10}} variant="contained" color="primary" onClick={()=> validateData()}>
  submit
</Button>
 
            </div>
            
      </TabPanel>

{/* panel for display All*/}
      <TabPanel value={value} index={1}>
      {showLoader?<CircularProgress />:
      <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  //style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  
                      <TableCell key={row.id} align={'center'} >
                       {row.name}
                      </TableCell>
                      <TableCell key={row.id} align={'center'}>
                       {row.discount}
                      </TableCell>
                      <TableCell key={row.id} align={'center'}>
                       {row.category}
                      </TableCell>
                      <TableCell key={row.id} align={'center'}>
                       <img alt='imga'  src={`${Base_url}/images/${row.image}`} style={{width:75,height:65}}/>
                      </TableCell>
                      <TableCell key={row.id} align={'center'}>
                       {row.price}
                      </TableCell>
                      <TableCell key={row.id} align={'center'}>
                       {row.description}
                      </TableCell>
                      <TableCell key={row.id} align={'center'}>
                       {row.stock}
                      </TableCell>
                      <TableCell key={row.id} align={'center'}>
                       {row.seller}
                      </TableCell>
                      <TableCell onClick={() =>{fillData(row)}} style={{color:'blue'}} key={row.id} align={'center'}>
                       Edit
                      </TableCell>
                   
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Paper>

}


    
      </TabPanel>
      
        
           
        </div>
    )
}