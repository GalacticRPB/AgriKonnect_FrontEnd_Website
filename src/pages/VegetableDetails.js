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
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

//Styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const classes = {
  SubHeader: {
    fontFamily: 'Poppins',
    color: '#5F645F',
    fontWeight: 'bold',
    margin: 2,
  },
  Sub2Header: {
    fontFamily: 'Poppins',
    color: '#5F645F',
    fontWeight: 'bold',
    
  },
  Header: {
    fontFamily: 'Poppins',
    color: '#5F645F',
    fontWeight: 'bold',
    margin: 2,
  },
  arrowback:{
      color: '#111111',
      width: 50,
      height: 50,
      marginTop: 5,
  },
  illustration:{
      display: 'flex',
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
    margin: 2,
    color: '#5F645F',
  },
  sellername:{
    fontFamily: 'Poppins',
    marginTop: 3,
    color: '#000000',
  },
  price:{
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 2,
    color: '#388E3C',
  },
  SubmitButton: {
      fontFamily: 'Poppins',
      margin: 1,
      padding: 1,
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
  stepper: {
    margin: 2,
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

      axios.get(`http://agrikonnect.herokuapp.com/${product_id}`).then((res) => {
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

     axios.post(`http://agrikonnect.herokuapp.com`, data).then(res=>{
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
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <Item>
                    <Box>
                        <CardMedia
                          component='img'
                          height="352"
                          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                          image={`http://agrikonnect.herokuapp.com/${image}`}
                        />
                    </Box>   
                    </Item>
                  </Grid>
                  <Grid item xs={8}>
                    <Item>
                    <Box sx = {classes.illustration}>
                        <Typography variant='h4' sx={classes.Header}>
                        {name}
                        </Typography>
                    </Box>
                    <Typography sx={classes.productprice}>
                        {category} | {description} 
                    </Typography>
                    <Divider/>
                        <Typography sx={classes.price}>
                            Php {price}.00
                        </Typography>
                        <Typography sx={classes.SubHeader}>
                            Available Stocks
                        </Typography>
                        <Typography sx={classes.productprice}>
                            {qty}
                        </Typography>
                        <Stack sx = {{margin: 2}} spacing = {2} direction='row'>
                            <Typography sx={classes.Sub2Header}>
                              Order Quantity
                              <br></br>(kg)
                            </Typography>
                              <ButtonGroup sx= {classes.stepper} aria-label="small button group">
                                  <Button sx={classes.StepperPlusButton} onClick={handleIncrement}><AddIcon sx={{fontSize:'medium'}}></AddIcon></Button>
                                  <Button sx = {classes.number}> {value}</Button>
                                  <Button sx={classes.StepperMinusButton}  onClick={handleDecrement}><RemoveIcon sx={{fontSize: 'medium'}}></RemoveIcon></Button>
                              </ButtonGroup>
                              <Box sx = {classes.illustration}>
                                  <Button sx={classes.SubmitButton} aria-label="add" onClick={submitProduct}>
                                      ADD TO BASKET
                                  </Button>
                            </Box>
                        </Stack>
                    </Item>
                  </Grid>
                </Grid>
                    <Stack direction='row' spacing={5}>
                        <Typography variant='h5' sx={classes.SubHeader}>
                            Seller Name: {seller}
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography variant='h5' sx={classes. SubHeader}>
                            Reviews
                        </Typography>
                    </Stack>
                    <List>
                    {reviewList}
                    </List>   
            </Box>
        </Box>
      </>
      
    );
}
export default VegetableDetails;