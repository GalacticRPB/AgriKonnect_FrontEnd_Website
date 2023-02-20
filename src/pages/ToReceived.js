import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Box, CssBaseline, Button, 
    GlobalStyles,Toolbar, Typography,
    Paper, Fab, styled, List, Stack, ListItem, ListItemText} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Image } from 'mui-image';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollToTop';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const classes = {
    root: {
      flexGrow: 1
    },
    Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F5B5B',
      marginTop: 5,
      marginLeft: 2,
    },
    SubHeader: {
      fontFamily: 'Poppins',
      color: '#5F5B5B',
      fontSize: 25,
      marginBottom: 5,
    },
    SearchButton: {
      fontFamily: 'Poppins',
      marginBottom: 5,
      backgroundColor: '#FFFFFF'
    },
    ButtonTitle: {
      fontFamily: 'Poppins',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFF',
      textAlign: 'center'
    },
    arrowback:{
        color: '#111111',
        width: 50,
        height: 50,
        marginTop: 5,
    },
    producttitle:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#000000',
    },
    productprice:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#000000',
    },
    basketbutton:{
        backgroundColor:'#31A05F',
        padding: 1,
        "&:hover": {
          color: '#FFFF',
          backgroundColor: '#388E3C',
        },
    },
    HeaderSub: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        color: '#000000',
    },
  }

function ToReceivedPage(props) 
{
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [forDelivery, setToDeliver] = useState([]);

    let customer = JSON.parse(localStorage.getItem('user-info'))
    let id = customer.id;

    const productId = forDelivery[0]?.product_id;
    const sellerId = forDelivery[0]?.seller_id;
    const customerId = forDelivery[0]?.customerId;
    const orderId = forDelivery[0]?.order_id;
    const orderName = forDelivery[0]?.order_name;
    const orderQty = forDelivery[0]?.order_qty;
    const orderPrice = forDelivery[0]?.order_price;
    const orderTotal = forDelivery[0]?.order_total;
    const firstname = forDelivery[0]?.firstname;
    const middlename = forDelivery[0]?.middlename;
    const lastname = forDelivery[0]?.lastname;
    const mobilephone = forDelivery[0]?.contactNo;
    const shippingaddress = forDelivery[0]?.shippingaddress;
    const modeofpayment = forDelivery[0]?.modeofpayment;


    useEffect(() => {

        axios.get(`http://agrikonnect.herokuapp.com/${id}`).then((res) => {
          if (res.status === 200) {
            setToDeliver(res.data.deliveries);
            setLoading(false);
          }
        });
        
      }, [id]);

      console.log(forDelivery)
      
    const orderDelivered = (e) => {
        e.preventDefault();

        const delivered = {
            product_id: productId,
            seller_id: sellerId,
            customerId: customerId,
            order_id: orderId,
            order_name: orderName,
            order_qty: orderQty,
            order_price: orderPrice,
            order_total: orderTotal,
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            contactNo: mobilephone,
            shippingaddress: shippingaddress,
            modeofpayment: modeofpayment,
        }
        console.log(delivered)

        axios.post(`http://agrikonnect.herokuapp.com`, delivered).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order Delivered", res.data.message, "Success")
                history('/toReview')
            }
         });
    }
      
    if(loading)
        {
            return <CircularProgress color="success" />
        }

        if (forDelivery.length > 0)
        {
            var showOutforDeliveryOrders = "";
            showOutforDeliveryOrders = forDelivery.map( (item, idx) => {
                return(
                    <Box sx={{ width: '100%', marginBottom: 1 }}>
                <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                <Item key={idx}>
                    <ListItem alignItems="flex-start">
                    <ListItemText primary={item.order_name} secondary={<Typography
                    sx={{ display: 'inline',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    color: '#000000',}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    >
                    {item.order_total}.00
                    </Typography>
                    } 
                    primaryTypographyProps={{ style: classes.producttitle }}
                    secondaryTypographyProps={{style: classes.productprice }}/>
                    </ListItem>
                    <Button variant="contained"  
                       onClick={orderDelivered} sx={classes.ViewButton}>
                        ORDER RECEIVED</Button>
                </Item>
                </Stack>
            </Box>
                    
                )
            });

        }

        else {
            showOutforDeliveryOrders =<Typography variant='h5' sx={classes.HeaderSub}>
            No available transaction
        </Typography>
        }
   
           

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
                    <Button onClick={() => history('/customer-account')}>
                        <ArrowBackIcon sx = {classes.arrowback}/>
                    </Button>
                    <Typography variant='h3' sx={classes.Header}>
                    To Receive
                    </Typography>
                </Stack>
                <List>
                    {showOutforDeliveryOrders}
                </List>
                <ScrollTop {...props}>
                    <Fab sx= {classes.ScrollTopButton} size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </Box>
        </Box>
    </>
    );

}

export default ToReceivedPage;