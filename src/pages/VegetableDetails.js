import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress';

import { Box, CssBaseline, Button, 
  GlobalStyles,IconButton, Toolbar, Typography,
  Paper, ButtonGroup, InputBase,styled, Grid, ListItemIcon, 
  List, Stack, ListItemButton, ListItemText, Avatar, Divider} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Image } from 'mui-image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



//Styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const classes = {
  SubHeader: {
    fontFamily: 'Poppins',
    color: '#000000',
    fontWeight: 'bold',
  },
  arrowback:{
      color: '#111111',
      width: 50,
      height: 50,
      marginTop: 5,
  },
  illustration:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  name:{
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 5,
  },
  rate:{
      fontFamily: 'Poppins',
      color: '#000000',
      marginLeft: 1,
  },
  comment:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#000000',
      marginLeft: 5,
  },
  productprice:{
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000000',
  },
  SubmitButton: {
      fontFamily: 'Poppins',
      margin: 1,
      color: "#FFFF",
      backgroundColor: '#388E3C'
  },
  VisitButton:{
      fontFamily: 'Poppins',
      marginLeft: 15,
      color: "#FFFF",
      backgroundColor: '#388E3C',
      "&:hover": {
          color: '#FFFF',
          backgroundColor: '#4DA351',
         },
  },
  ViewAllButton:{
      color: "#388E3C",
      "&:hover": {
          color: '#FFFF',
          backgroundColor: '#4DA351',
         },
  },
  tepper: {
    marginTop: 1,
    marginBottom: 1,
  },
  StepperPlusButton: {
      backgroundColor: '#388E3C',
      color: '#FFFF',
      fontSize: 20,
      "&:hover": {
          color: '#FFFF',
          backgroundColor: '#31A05F',
      },
  },
  StepperMinusButton: {
    backgroundColor: '#F22323',
    color: '#FFFF',
    fontSize: 20,
    "&:hover": {
        color: '#FFFF',
        backgroundColor: '#FF7D7D',
    },
},
  number: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F5B5B',
      backgroundColor: '#FFF59D',
  },
  stepperlabel: {
      fontFamily: 'Poppins',
      fontSize: 15,
      color: '#5F5B5B',
      marginLeft: 1,
      marginTop: 2,
  },
}


function VegetableDetails()
{
   
  const location = useLocation();
  const state = location.state;
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setQuantity] = useState(1);

  const product_id = state.id;
  const navigate = useNavigate();

  const name = state.name;
  const image = state.image;
  const seller = state.seller_name;
  const description = state.description;
  const price = state.price;
  const category = state.category;
  const qty = state.quantity

  useEffect(() => {

      axios.get(`http://localhost:8000/api/viewvegetable/${product_id}`).then((res) => {
        if (res.status === 200) {
          
          setReview(res.data.reviews);
          setLoading(false);
  
        }
        console.log(res.data.reviews)

      });
      
    },[product_id]);

    

    const handleDecrement = () => {
      if(value > 1)
      {
        setQuantity(prevCount => prevCount - 1);
      }
      
    }

    const handleIncrement = () => {
      if(value < 10)
      {
        setQuantity(prevCount => prevCount + 1);
      }
      
    }
    const submitProduct = (e) => {
      e.preventDefault();

      const data = {
        product_id: product_id,
        seller_id: state.user_id,
        fruits_qty: value,  
        name: state.name,
        price: state.price,
        customerId:JSON.parse(localStorage.getItem('customer')).id,
        image: state.image,
      }

     axios.post(`http://localhost:8000/api/addtoCart`, data).then(res=>{
        if(res.data.status === 201)
        {
          swal("Success",res.data.message,"success");
        }
        else if(res.data.status === 409)
        {
          swal("Warning",res.data.message,"warning");
        }
        else if(res.data.status === 401)
        {
          swal("Error",res.data.message,"error");
        }
        else if(res.data.status === 404)
        {
          swal("Warning",res.data.message,"warning");
        }
      });

    }
      

      if(loading)
    {
        return <CircularProgress color="success" />
    }
    var reviewList = "";
    reviewList = review.map((item, idx) => {
      return(
        <Box sx={{ width: '100%', marginBottom: 1 }}>
        <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
        <Item key = {idx}>
            <ListItemButton>
              <Typography sx={classes.name}>
              {item.firstname} {item.middlename} {item.lastname}: 
              </Typography>
            <ListItemText primary={item.review} 
            primaryTypographyProps={{ style: classes.name }}
            />
            </ListItemButton>
        </Item>
        </Stack>
    </Box>
      ) 
    })
    

    return(
      <>
      <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: "#F4F4F4" },
          }}
      />
      <CustomerResponsiveAppBar/>
      <Box component="main" sx={{ p: 3 }}>
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
            >   
                <Toolbar id="back-to-top-anchor"/>
                <Stack direction='row'>
                    <Button onClick={() => navigate('/vegetables')}>
                        <ArrowBackIcon sx = {classes.arrowback}/>
                    </Button>
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Box sx = {classes.illustration}>
                        <Image src={`http://localhost:8000/${image}`} duration = {0} height= {"50hv"} width= {"50hv"}></Image>
                    </Box>    
                    <Box sx = {classes.illustration}>
                        <Typography variant='h5' sx={classes. SubHeader}>
                        {name}
                        </Typography>
                    </Box>
                    <Typography variant='h5' sx={classes. SubHeader}>
                        Product Category:
                    </Typography>
                    <Typography variant='h6' sx={classes.productprice}>
                        {category}
                    </Typography>
                    <Divider/>
                    <Typography variant='h5' sx={classes.SubHeader}>
                        Growing Method:
                    </Typography>
                    <Typography variant='h6' sx={classes.productprice}>
                      {description}
                    </Typography>
                    <Divider/>
                        <Typography variant='h5' sx={classes.SubHeader}>
                            Price
                        </Typography>
                        <Typography variant='h6' sx={classes.productprice}>
                            Php {price}.00
                        </Typography>
                        <Typography variant='h5' sx={classes.SubHeader}>
                            Available Stocks
                        </Typography>
                        <Typography variant='h6' sx={classes.productprice}>
                            {qty}
                        </Typography>
                        <Divider/>
                        <Typography variant='h5' sx={classes.SubHeader}>
                            Order Quantity
                        </Typography>
                        <Stack direction='row'>
                              <ButtonGroup sx= {classes.stepper} size="small" aria-label="small button group">
                              <Button sx={classes.StepperMinusButton}  onClick={handleDecrement}>-</Button>
                                  <Button sx = {classes.number}> {value}</Button>
                                  <Button sx={classes.StepperPlusButton} onClick={handleIncrement}>+</Button>
                              </ButtonGroup>
                              <Typography sx={classes.stepperlabel}> 
                                  kg
                              </Typography>
                        </Stack>
                    <Divider/>
                    <Stack direction='row' spacing={5}>
                        <Typography variant='h5' sx={classes.SubHeader}>
                            Seller Name:
                        </Typography>
                        <Typography variant='h6' sx={classes.productprice}>
                            {seller}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography variant='h5' sx={classes.productprice}>
                            Reviews
                        </Typography>
                    </Stack>
                    <List>
                    {reviewList}
                    </List>
                    <Box sx = {classes.illustration}>
                        <Stack direction='row'>
                            <Button sx={classes.SubmitButton} aria-label="add" onClick={submitProduct}>
                                ADD TO BASKET
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
      </>
      
    );
}
export default VegetableDetails;