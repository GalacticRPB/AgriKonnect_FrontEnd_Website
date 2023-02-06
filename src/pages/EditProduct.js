import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useLocation} from 'react-router';
import { Box, 
    Button,
    Typography,
    Toolbar,
    TextField,
    Stack,
    FormControl,
    MenuItem,
    Select,} from '@mui/material';
import ResponsiveDrawer from '../components/Drawer';

//ScreenSize
const drawerWidth = 240;
//Styles
const classes = {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: 20,
      textAlign: "center",
      color: "blue"
    },
    Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#31A05F',
      marginBottom: 5,
    },
    SecondHeader:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#31A05F',
        marginTop: 5,
        marginBottom: 2,
    },
    HeaderSub: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#31A05F',
    },
    Subtitle: {
        fontFamily: 'Poppins',
        color: '#5F5B5B',
    },
    AddImageButton:{
        color: '#00000',
        backgroundColor: '#D9D9D9',
        borderStyle: "dashed",
        padding: 10,
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    },
    addIcon:{
        color: '#00000',
    },
    label: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#5F5B5B',
        marginLeft: 0,
        marginTop: 1,
    },
    labelItem: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#00000',
        backgroundColor: '#D9D9D9',
        borderColor: '#D9D9D9',
    },
    stepper: {
        marginTop: 1,
        marginBottom: 1,
    },
    StepperButton: {
        backgroundColor: '#000000',
        color: '#FFFF',
        fontSize: 20,
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    },
    number: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#000000',
    },
    stepperlabel: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#5F5B5B',
        marginLeft: 1,
        marginTop: 2,
    },
    AddButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#6FCF97',
        },
        margin: 1,
    },
    EditImageButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    },
    CancelButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#F22323',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#FF7D7D',
        },
        margin: 1,
    },
    positionButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    }
}

const EditProduct = ({productdata}) => {

    const [user, setUser]= useState(null);
    const location = useLocation();
    const history = useNavigate();
    const state = location.state;
    const [productInput, setProduct] = useState(state);
    const [errorList, setError] = useState([]);
    
    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value });
    }

    const updateProduct = (e) => {
        e.preventDefault();
        
        const product_id = state.id;
        const data = {
            user_id: user.id,
            category: productInput.category || state.category,
            name: productInput.name || state.name,
            description: productInput.description || state.description,
            price: productInput.price || state.price,
            quantity: productInput.quantity || state.quantity,
        }
        console.log(data)
        axios.put(`http://localhost:8000/api/products/${product_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history('/products');
            }
            else if(res.data.status === 422)
            {
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/products');
            }
        });
    }
    React.useEffect(() => {
        
        if (!user){
            
            setUser(JSON.parse(localStorage.getItem('user')))
        }

    },[user])

    return (
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer/>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Typography variant='h4' sx={classes.Header}>
              Edit Product
            </Typography>
            <Stack direction="column" spacing={1}>
                <Typography variant='h5' sx={classes.SecondHeader}>
                    Edit product details
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Typography sx={classes.label}>Select product category</Typography>
                <Select
                id = "category"
                name = "category"
                onChange={(e) => handleInput(e)} 
                defaultValue={productInput?.category}
                displayEmpty
                sx={classes.labelItem}
                >
                    <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
                    <MenuItem value={"Fruits"}>Fruits</MenuItem>
                </Select>
                <span className="text-danger">{errorList.category}</span>
                <Typography sx={classes.label}>Product name</Typography>
                <TextField
                    hiddenLabel
                    id="name"
                    name = "name"
                    onChange={(e) => handleInput(e)} 
                    value={productInput?.name} 
                    sx={classes.labelItem}
                />
                <span className="text-danger">{errorList.name}</span>
                <Typography sx={classes.label}>Growing Method</Typography>
                <Select
                onChange={(e) => handleInput(e)} 
                defaultValue={productInput?.description}
                displayEmpty
                sx={classes.labelItem}
                >
                    <MenuItem value={"Organic"}>Organic</MenuItem>
                    <MenuItem value={"Fertilizer"}>Fertilizer</MenuItem>
                </Select>
                <span className="text-danger">{errorList.description}</span>
                <Typography sx={classes.label}>Product price</Typography>
                <TextField
                    hiddenLabel
                    id="price"
                    name = "price"
                    onChange={(e) => handleInput(e)} 
                    value={productInput?.price}
                    sx={classes.labelItem}
                />
                <span className="text-danger">{errorList.price}</span>
                <Typography sx={classes.label}>Product quantity</Typography>
                <TextField
                    fullWidth
                    id="quantity"
                    name="quantity"
                    onChange={handleInput} 
                    value={productInput?.quantity}
                    sx={classes.labelItem}
                />
                <span className="text-danger">{errorList.quantity}</span>
                <Stack direction='row' sx = {classes.positionButtons}>
                    <Button variant="contained" sx={classes.AddButton} onClick={(e) => updateProduct(e)}>SAVE CHANGES</Button>
                    <Button variant="contained" sx={classes.CancelButton} onClick={() => history('/products')}>CANCEL</Button>
                </Stack>
                </FormControl>
            </Stack>
        </Box>
        </Box>
    );

}

export default EditProduct; 