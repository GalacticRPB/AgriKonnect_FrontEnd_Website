import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Box, 
    Typography,
    Toolbar,
    Paper, 
    styled,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    TableBody,
    Button,
    Fab,} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ResponsiveDrawer from '../components/Drawer';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollToTop';


//ScreenSize
const drawerWidth = 240;

//Styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const classes = {
  Header: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#5F645F',
  },
  positionButton:{
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'center',
  },
  OngoingButton:{
    width: 500,
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    backgroundColor: '#6FCF97',
    borderColor: '#FFFF',
    borderRadius: 2,
    color: '#FFFF',
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
      borderColor: '#FFFF',
    },
  },
  DeliveredButton:{
    width: 500,
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    backgroundColor: '#6FCF97',
    borderRadius: 2,
    color: '#FFFF',
    borderColor: '#FFFF',
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
      borderColor: '#FFFF',
    },
  },
  producttitle: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  productsub: {
    fontFamily: 'Poppins',
    marginLeft: 5,
  },
  transacbutton: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    backgroundColor:'#31A05F',
    padding: 1,
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
   },
  },
  ScrollTopButton:{
    color: 'white',
    backgroundColor: '#4DA351',
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#31A05F',
    },
  },
  HeaderSub: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    color: '#5F645F',
  },
  ViewButton: {
    fontFamily: 'Poppins',
    margin: 1,
    color: "#FFFF",
    backgroundColor: '#374989'
  },
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#31A05F',
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: 'Poppins',
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
  

function OrderDetails(props) 
{
    const location = useLocation();
    const state = location.state;
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [orderItem, setItems] = useState([]);

    const order_id = state.order_id;
    //const customerId = orders.user_id;
    const productName = state.order_name;
    const qty = state.qty;
    const price = state.price;
    const totalPrice = state.total_price;

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/orderDetails/${order_id}`).then((res) => {
          if (res.status === 200) {
            setOrders(res.data.orders);
            setItems(res.data.order_items[0]);
            setLoading(false);
          }
        });
        
      }, [order_id]);
      
      const orderApproved = (e) => {
        e.preventDefault();

        const approvedOrders = {
            product_id: state.product_id,
            seller_id: state.seller_id,
            customer_id: state.user_id,
            order_id: state.order_id,
            order_name: state.order_name,
            order_qty: state.qty,
            order_price: state.price,
            order_total: state.total_price,
            firstname: orderItem.firstname,
            middlename: orderItem.middlename,
            lastname: orderItem.lastname,
            mobilephone: orderItem.mobilephone,
            shippingaddress: orderItem.shippingaddress,
            modeofpayment: orderItem.modeofpayment,
            
        }

        console.log(orderItem)

        axios.post(`http://localhost:8000/api/approve-order`, approvedOrders).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order Approved!!", res.data.message, "Success")
                history('/transactions/ongoing');
            }
         });
      }
      if(loading)
        {
            return <CircularProgress color="success" />
        }

        if(orders.length > 0)
        {
            var orderDetails_HTMLTABLE = "";
       
            orderDetails_HTMLTABLE = orders.map( (item, index) => {
                return (
                    <TableBody>
                    <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <StyledTableCell component="th" scope="row">
                    {item.id}
                    </StyledTableCell>
                        <StyledTableCell align="right">{productName}</StyledTableCell>
                        <StyledTableCell align="right">{qty}</StyledTableCell>
                        <StyledTableCell align="right">{price}</StyledTableCell>
                        <StyledTableCell align="right">{totalPrice}</StyledTableCell>
                    </StyledTableRow>
                    </TableBody>
                );
            });

            var orderInfo_HTMLTABLE = "";
       
            orderInfo_HTMLTABLE = orders.map( (item, index) => {
                return (
                    <TableBody>
                    <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell align="right">{item.firstname} {item.middlename} {item.lastname}</StyledTableCell>
                        <StyledTableCell align="right">{item.mobilephone}</StyledTableCell>
                        <StyledTableCell align="right">{item.shippingaddress}</StyledTableCell>
                        <StyledTableCell align="right">{item.modeofpayment}</StyledTableCell>
                        <StyledTableCell align="right"><Button variant="contained"  
                        onClick={orderApproved} sx={classes.ViewButton}>
                        APPROVE ORDER</Button>
                        </StyledTableCell>
                    </StyledTableRow>
                    </TableBody>
                );
            });
        }

        else {
            orderDetails_HTMLTABLE =<Typography variant='h5' sx={classes.HeaderSub}>
                No Available transaction
            </Typography>

            orderInfo_HTMLTABLE =<Typography variant='h5' sx={classes.HeaderSub}>
                No Available transaction
            </Typography>
        }
            
           

    return (
        <>
        <Box component="form" sx={{ display: 'flex' }}>
            <ResponsiveDrawer/>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            <Toolbar id="back-to-top-anchor"/>
            <Typography variant='h3' sx={classes.Header}>
            Order Information
            </Typography>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Order ID</StyledTableCell>
                    <StyledTableCell align="right">Product Name</StyledTableCell>
                    <StyledTableCell align="right">Quantity&nbsp;(kg)</StyledTableCell>
                    <StyledTableCell align="right">Price per Kilo</StyledTableCell>
                    <StyledTableCell align="right">Total Price</StyledTableCell>
                </TableRow>
            </TableHead>
                {orderDetails_HTMLTABLE}
            </Table>
            </TableContainer>
            <Typography variant='h3' sx={classes.Header}>
            Transaction Details
            </Typography>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="right">Customer Name</StyledTableCell>
                    <StyledTableCell align="right">Mobile Phone</StyledTableCell>
                    <StyledTableCell align="right">Shipping Address</StyledTableCell>
                    <StyledTableCell align="right">Mode of Payment</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
            </TableHead>
                {orderInfo_HTMLTABLE}
            </Table>
            </TableContainer>
            </Box>
            <ScrollTop {...props}>
                <Fab sx= {classes.ScrollTopButton} size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Box> 
       </> 
    );

}

export default OrderDetails;