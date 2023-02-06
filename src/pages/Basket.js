/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from "react-router-dom";
import {
  Box,
  Stack,
  ButtonGroup,
  Button,
  Checkbox,
  Container,
  FormGroup,
  Paper,
  CssBaseline,
  GlobalStyles,
  Toolbar,
  Typography,
} from "@mui/material";
import { Image } from "mui-image";
import { useNavigate } from "react-router-dom";
import CustomerResponsiveAppBar from "../components/CustomerResponsiveAppBar";


const classes = {
    Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F645F',
      marginTop: 2,
    },
    stepper: {
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
    checkoutbutton:{
      marginBottom: 2,
      marginTop: -1,
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#FFFF',
      backgroundColor:'#31A05F',
      padding: 1,
      "&:hover": {
        color: '#FFFF',
        backgroundColor: '#388E3C',
      },
    },
    TextTotal:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#000000',
      marginTop: 2,
    },
    TextAmount:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#000000',
      marginTop: 2,
      marginRight: 5,
    },
  }

const SHIPPING_FEE = 50;
const MODEOFPAYMENT = "Cash on Delivery";

function Basket() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(state);
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [value, setQuantity] = useState(1);
  // const [search, setSearch] = useState("")
  // const [productList, setProductList] = useState([])
  // const [results, setResults] = useState([])

  // useEffect(() => {
  //   const results = productList.find((product) => product.name == search)
  //   setResults(results)
  // }, [search])

  useEffect(() => {
    var total_ = 0;

    selectedItems.forEach((item) => {
      total_ = item.price * item.fruits_qty;
    });

    setTotal((prev) => prev + total_);

    if (Object.keys(customer).length === 0) {
      setCustomer(JSON.parse(localStorage.getItem("customer")));
    }

    if (!cart) {
      axios
        .get(`http://127.0.0.1:8000/api/basket/${customer.id}`)
        .then((res) => {
          if (res.status === 200) {
            setCart(res.data.cart);
            setLoading(false);
          }
        });
    }
  }, [customer, cart, selectedItems]);

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              fruits_qty: item.fruits_qty - (item.fruits_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };

  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              fruits_qty: item.fruits_qty + (item.fruits_qty < 10 ? 1 : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "inc");
  };

  function updateCartQuantity(cart_id, scope) {
    axios
      .put(
        `http://localhost:8000/api/basket-updatedquantity/${cart_id}/${scope}/${customer.id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          //swal("Success", res.data.message, "success")
        }
      });
  }
  if (loading) {
    return <CircularProgress color="success" />
  }

  const addToSelected = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((e) => e !== item));
      setTotal(0);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleCheckout = () => {
    console.log(cart);
    navigate(`/checkout/${customer.id}`, { state:{ shippingFee: SHIPPING_FEE, selectedItems, total, modeofpayment: MODEOFPAYMENT }});
  };

  const getBasketContent = () => {
    if (cart.length > 0) {
      return (
        <FormGroup>
          {cart.map((item, idx) => (
            <Paper
              key={idx}
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyConte: "space-between",
              }}
            >
              <Box sx={{ display: "flex", width: "50%", margin: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Checkbox onClick={() => addToSelected(item)} />
                  <Image width="120px" alt={item.image} duration={0} src={`http://localhost:8000/${item.image}`}/>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "50%",
                  }}
                >
                  <Typography>{item.name}</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Php {item.price * item.fruits_qty}.00
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Stack direction='row'>
                    <ButtonGroup sx= {classes.stepper} size="small" aria-label="small button group">
                        <Button sx={classes.StepperMinusButton} onClick={() => handleDecrement(item.id)}>-</Button>
                        <Button sx = {classes.number}> {item.fruits_qty}</Button>
                        <Button sx={classes.StepperPlusButton}  onClick={() => handleIncrement(item.id)}>+</Button>
                    </ButtonGroup>
                    <Typography sx={classes.stepperlabel}> 
                      kg
                    </Typography>
                </Stack>
              </Box>
            </Paper>
          ))}
        </FormGroup>
      );
    } else {
      return (
        <div>
          <div className="card card-body py05 text-center shadow-sm">
            <h4>Your Shopping Cart is Empty</h4>
          </div>
        </div>
      );
    }
  };

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
              <Typography variant='h3' sx={classes.Header}>
                My Basket
              </Typography>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {getBasketContent()}
          <Paper
            sx={{
              display: "flex",
              width: "30%",
              alignSelf: "flex-end",
              padding: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Subtotal: Php {total}.00
              </Typography>
              <Typography>Shipping Fee: Php {SHIPPING_FEE}.00</Typography>
            </Box>
            <Button sx={{ height: 64 }} variant="contained" onClick={handleCheckout}>
              Checkout
            </Button>
          </Paper>
        </Box>
      </Container>
      </Box>
      </Box>
    </>
  );
}

export default Basket;
