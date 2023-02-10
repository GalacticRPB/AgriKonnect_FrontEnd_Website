import axios from "axios";
import React, {useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Box, CssBaseline, Button, 
  GlobalStyles,Toolbar, Typography, Divider,
   Stack,} from "@mui/material";
import { Image } from 'mui-image';
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CardActions from "@mui/material/CardActions";
import CardMedia from '@mui/material/CardMedia';

const classes = {
  Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F5B5B',
      marginTop: 6,
      marginLeft: 2,
    },
  Title: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F5B5B',
      marginTop: 6,
      marginLeft: 2,
  },
  Title2: {
    fontFamily: 'Poppins',
    color: '#5F5B5B',
    margin: 2,
},
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
  SubmitButton: {
      fontFamily: 'Poppins',
      alignItems: 'center',
      justifyContent: 'center',
      color: "#FFFF",
      backgroundColor: '#388E3C'
  },
  ButtonContainer:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#00000',
      backgroundColor: '#D9D9D9',
      borderColor: '#D9D9D9',
     },
    TitleButton:{
      fontFamily: 'Poppins',
      color: '#00000',
      "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
      },
    },
    ArrowRight:{
      marginLeft: 20,
      "&:hover": {
        color: '#FFFF',
      },
    },
}



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));




function Checkout() {
  let customer = JSON.parse(localStorage.getItem("user-info"));
  localStorage.setItem("customer", JSON.stringify(customer));

  const location = useLocation();
  const state = location.state;
  const history = useNavigate();

  console.log(state);


  const cartId = state.selectedItems[0].id;
  const sellerId = state.selectedItems[0].seller_id;
  const productId = state.selectedItems[0].product_id;
  const productName = state.selectedItems[0].name;
  const productQty = state.selectedItems[0].fruits_qty;
  const total_price = state.total;
  const price = state.selectedItems[0].price;
  const shippingfee = state.shippingFee;
  const grandtotal = (state.shippingFee + state.total );
  const image = state.selectedItems[0].image;

  console.log(price)
  const [checkoutInput, setCheckoutInput] = useState({
    shippingaddress: "",
  });

  const [error, setError] = useState([]);
  //const [orderData, setCustomer] = useState(state);

  //var totalCartPrice = 0;

  /*useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/checkout/${cart_id}`).then((res) => {
      if (res.status === 200) {
        setCustomer(res.data.customer);
        setCart(res.data.cart);
        setLoading(false);
      }
    });
  }, [cart_id]);*/


  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };
  

  const submitOrder = (e) => {
    e.preventDefault();

    const orders = {
      cart_id: cartId,
      seller_id: sellerId,
      order_name: productName,
      price: price,
      product_id: productId,
      product_qty: productQty,
      shippingfee: shippingfee,
      total_price: grandtotal,
      firstname: customer.firstname,
      middlename: customer.middlename,
      lastname: customer.lastname,
      shippingaddress: checkoutInput.shippingaddress,
      mobilephone: customer.mobilephone,
      modeofpayment: state.modeofpayment,
      user_id: customer.id,
      image: image,

    };

    console.log(orders)


    axios.post(`http://localhost:8000/api/place-order`, orders).then((res) => {
      if (res.data.status === 200) {
        swal("Order Placed Successfully", res.data.message, "Success");
        setError([]);
        history("/basket");
      } else if (res.data.status === 422) {
        swal("All fields are mandatory", "", "error");
        setError(res.data.errors);
      }
    });
  };

  /*if (loading) {
    return <h4>Loading Checkout Details...</h4>;
  }*/
  var checkOutDetails = "";
  checkOutDetails = state.selectedItems.map( (item, idx) => {
    return(
      <> 
      <Box>
        <CardMedia
            component='img'
            height="205"
            alt={item.image}
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            image={`http://localhost:8000/${item.image}`}
        />
      </Box>   
      
      <Box sx = {classes.illustration}>
        <Typography variant='h5' sx={classes. SubHeader}>
        {item.name}
        </Typography>
        </Box>
        <Box sx = {classes.illustration}>
        <Typography variant='o' sx={classes. SubHeader}>
        Quantity: {item.fruits_qty}
        </Typography>
        </Box>
        <Box sx = {classes.illustration}>
        <Typography variant='p' sx={classes. SubHeader}>
        Price: Php {item.price}.00
        </Typography>
      </Box>
      </>
    )
  })
  
  return (
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
                    <Button onClick={() => history('/basket')}>
                        <ArrowBackIcon sx = {classes.arrowback}/>
                    </Button>
                    <Typography variant='h4' sx={classes.Header}>
                      Checkout Details
                    </Typography>
                </Stack>
                <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          
        </Box>
        <Box gridColumn="span 12">
          <Item>
          <Typography variant="h4" sx={classes.Title2}>Personal Information</Typography>
                      <Divider></Divider>
                      <div className="form-group mb-3">
                      <input
                        type="text"
                        name="shippingaddress"
                        style={{
                          margin: 12,
                          width: '95%',
                        }}
                        onChange={handleInput}
                        value={checkoutInput.shippingaddress}
                        className="form-control"
                        placeholder="Enter Shipping Address"
                      />
                      <small 
                      style={{
                        margin: 12,
                      }}
                      className="text-danger">
                      {error.shippingaddress}
                      </small>
                      </div>
                      <div className="form-group mb-3">
                      <div className="form-group mb-3">
                      <p style={{fontWeight: 'bold',
                      fontFamily: 'Poppins',
                    fontSize: 15,
                    margin: 15,}}>Mobile Phone</p>
                      <p
                      style={{
                        margin: 15,
                        fontSize: 15,
                        fontFamily: 'Poppins',
                      }}>{customer.mobilephone}</p>
                      </div>
                      <small className="text-danger">
                        {error.mobilephone}
                      </small>
                      </div>
          </Item>
        </Box>
        <Box gridColumn="span 4">
          <Item>
          {checkOutDetails}
               </Item>
        </Box>
        <Box gridColumn="span 8">
          <Item>
            <Typography variant='h4' sx={classes.Title2}>
                      Order Details
                    </Typography>
                    <Divider/>
                    <br></br>
                      <p
                      style={{
                        margin: 15,
                        fontSize: 15,
                        fontFamily: 'Poppins',
                      }}>Shipping Fee: Php {shippingfee}.00</p>
                  <p style={{
                        margin: 15,
                        fontSize: 15,
                        fontFamily: 'Poppins',
                      }}>Subtotal: Php {total_price}.00</p>
                  <p
                  style={{
                    margin: 15,
                    fontSize: 20,
                    fontFamily: 'Poppins',
                    fontWeight: 'bold'
                  }}
                  >Total (including shipping fee): Php {grandtotal}.00</p>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button sx={classes.SubmitButton} onClick={submitOrder} aria-label="add">
                    PLACE ORDER
                    </Button> 
                  </CardActions>
                 
                   
          </Item>
        </Box>
      </Box>
    </Box>
               
                </Box>
                </Box>
   

                       
    </>
  );
}

export default Checkout;
