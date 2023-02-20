import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Box, 
    Button,
    Typography,
    Toolbar,
    TextField,
    Stack,
    MenuItem,
    Select,
SelectChangeEvent} from '@mui/material';
import ResponsiveDrawer from '../components/Drawer';
import AddIcon from '@mui/icons-material/Add';

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
    UploadImageButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    },
    positionButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    }
}

const AddProduct = () => {


    let user = JSON.parse(localStorage.getItem('user-info'))

    const history = useNavigate();
    const [productInput, setProduct] = useState({
        category:'',
        name: '',
        seller_name: '',
        description: '',
        price: '',
        quantity: '',
    });

    const [productImage, setImage] = useState([]);
    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
        setProduct({...productInput, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setImage({image:e.target.files[0]});
      }
  

    const saveProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', productImage.image);
        formData.append('category', productInput.category);
        formData.append('name', productInput.name);
        formData.append('seller_name', user.firstname);
        formData.append('description', productInput.description);
        formData.append('price', productInput.price);
        formData.append('quantity', productInput.quantity);
        formData.append('user_id', user.id);

        axios.post(`http://agrikonnect.herokuapp.com`, formData).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setError([]);
                history('/products');
            }
            else if(res.data.status === 422)
            {
                setError(res.data.errors);
            }
        });
        console.log(formData)
    }

    return (
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer/>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Box>
                <Typography variant='h4' sx={classes.Header}>
                Add new Product
                </Typography>
                    <Stack direction="column">
                            <input placeholder=" " name="image" onChange={handleImage} type="file"/>
                        <Typography sx={classes.Subtitle}>
                            Upload an image of your product
                        </Typography>
                    </Stack>
                <Box direction="column" spacing={1}>
                    <Typography variant='h5' sx={classes.SecondHeader}>
                        Add product details
                    </Typography>
                    <Box component="form" sx={{ mt: 1, minWidth: 120 }}>
                        <Typography sx={classes.label}>Select product category</Typography>
                        <Select
                        fullWidth
                        id="category" 
                        name="category"
                        onChange={handleInput} 
                        defaultValue=''
                        value={productInput?.category}
                        sx={classes.labelItem}
                        >
                            <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
                            <MenuItem value={"Fruits"}>Fruits</MenuItem>
                        </Select>
                        <span className="text-danger">{errorList.category}</span>
                        <Typography sx={classes.label}>Product name</Typography>
                        {/* <TextField
                            fullWidth
                            id="name"
                            name="name"
                            onChange={handleInput} 
                            value={productInput.name}
                            sx={classes.labelItem}
                        /> */}

                        <Select
                        fullWidth
                        onChange={handleInput} 
                        id="name" 
                        name="name"
                        defaultValue=''
                        value={productInput?.name}
                        displayEmpty
                        sx={classes.labelItem}
                        >
                            <MenuItem value={"Asparagus"}>Asparagus</MenuItem>
                            <MenuItem value={"Avocado"}>Avocado</MenuItem>
                            <MenuItem value={"Banana"}>Banana</MenuItem>
                            <MenuItem value={"Broccoli"}>Broccoli</MenuItem>
                            <MenuItem value={"Cabbage"}>Cabbage</MenuItem>
                            <MenuItem value={"Carrot"}>Carrot</MenuItem>
                            <MenuItem value={"Cauliflower"}>Cauliflower</MenuItem>
                            <MenuItem value={"Celery"}>Celery</MenuItem>
                            <MenuItem value={"Corn"}>Corn</MenuItem>
                            <MenuItem value={"Cucumber"}>Cucumber</MenuItem>
                            <MenuItem value={"Coconut"}>Coconut</MenuItem>
                            <MenuItem value={"Eggplant"}>Eggplant</MenuItem>
                            <MenuItem value={"Garlic"}>Garlic</MenuItem>
                            <MenuItem value={"Ginger"}>Ginger</MenuItem>
                            <MenuItem value={"Grape"}>Grape</MenuItem>
                            <MenuItem value={"Guava"}>Guava</MenuItem>
                            <MenuItem value={"Kangkong"}>Kangkong</MenuItem>
                            <MenuItem value={"Kiwi"}>Kiwi</MenuItem>
                            <MenuItem value={"Lettuce"}>Lettuce</MenuItem>
                            <MenuItem value={"Mango"}>Mango</MenuItem>
                            <MenuItem value={"Mushroom"}>Mushroom</MenuItem>
                            <MenuItem value={"Okra"}>Okra</MenuItem>
                            <MenuItem value={"Onion"}>Onion</MenuItem>
                            <MenuItem value={"Orange"}>Orange</MenuItem>
                            <MenuItem value={"Papaya"}>Papaya</MenuItem>
                            <MenuItem value={"Parsley"}>Parsley</MenuItem>
                            <MenuItem value={"Passion Fruit"}>Passion Fruit</MenuItem>
                            <MenuItem value={"Peach"}>Peach</MenuItem>
                            <MenuItem value={"Peppers"}>Peppers</MenuItem>
                            <MenuItem value={"Pineapple"}>Pineapple</MenuItem>
                            <MenuItem value={"Potato"}>Potato</MenuItem>
                            <MenuItem value={"Pumpkin"}>Pumpkin</MenuItem>
                            <MenuItem value={"Radish"}>Radish</MenuItem>
                            <MenuItem value={"Squash"}>Squash</MenuItem>
                            <MenuItem value={"Strawberry"}>Strawberry</MenuItem>
                            <MenuItem value={"Sweet Potato"}>Sweet Potato</MenuItem>
                            <MenuItem value={"Tomato"}>Tomato</MenuItem>
                            <MenuItem value={"Watermelon"}>Watermelon</MenuItem>
                        </Select>
                        <span className="text-danger">{errorList.name}</span>
                        <Typography sx={classes.label}>Growing Method</Typography>
                        <Select
                        fullWidth
                        onChange={handleInput} 
                        id="description" 
                        name="description"
                        defaultValue=''
                        value={productInput?.description}
                        displayEmpty
                        sx={classes.labelItem}
                        >
                            <MenuItem value={"Organic"}>Organic</MenuItem>
                            <MenuItem value={"Fertilizer"}>Conventional</MenuItem>
                        </Select>
                        <span className="text-danger">{errorList.description}</span>
                        <Typography sx={classes.label}>Product price</Typography>
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            onChange={handleInput} 
                            value={productInput.price}
                            sx={classes.labelItem}
                        />
                        <span className="text-danger">{errorList.price}</span>
                        <Typography sx={classes.label}>Product quantity</Typography>
                        <TextField
                            fullWidth
                            id="quantity"
                            name="quantity"
                            onChange={handleInput} 
                            value={productInput.quantity}
                            sx={classes.labelItem}
                        />
                        <span className="text-danger">{errorList.quantity}</span>
                    <Stack direction='row' sx = {classes.positionButtons}>
                        <Button variant="contained" sx={classes.AddButton} onClick={saveProduct}>SAVE PRODUCT</Button>
                        <Button variant="contained" sx={classes.CancelButton} onClick={() => history('/products')}>CANCEL</Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
        </Box>
    </Box>
    );

}

export default AddProduct;