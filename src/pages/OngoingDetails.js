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
  
function OngoingDetails(props) 
{
    const history = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [toShip, setToShip] = useState(state);

    const order_id = state.order_id;
    console.log(toShip)

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/to-ship-details/${order_id}`).then((res) => {
          if (res.status === 200) {
            setToShip(res.data.ongoing);
            setLoading(false);
          }
        });
        
      }, [order_id]);
      
      const outforDelivery = (e) => {
        e.preventDefault();

        const outfordelivery = {
            product_id: state.product_id,
            seller_id: state.seller_id,
            customerId: state.customerId,
            order_id: state.order_id,
            order_name: state.order_name,
            order_qty: state.order_qty,
            order_price: state.order_price,
            order_total: state.order_total,
            firstname: state.firstname,
            middlename: state.middlename,
            lastname: state.lastname,
            contactNo: state.contactNo,
            shippingaddress: state.shippingaddress,
            modeofpayment: state.modeofpayment,
            
        }

        axios.post(`http://localhost:8000/api/out-for-delivery`, outfordelivery).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order is out for Delivery", res.data.message, "Success")
                history('/transactions/ongoing');
            }
         });
      }

      if(loading)
        {
            return <CircularProgress color="success" />
        }
        
            var toShipOrder_HTMLTABLE = "";
       
            toShipOrder_HTMLTABLE = toShip.map( (item, index) => {
                return (
                    <TableBody>
                    <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell align="right">{item.id}</StyledTableCell>
                        <StyledTableCell align="right">{item.order_name}</StyledTableCell>
                        <StyledTableCell align="right">{item.order_qty}</StyledTableCell>
                        <StyledTableCell align="right">{item.order_price}</StyledTableCell>
                        <StyledTableCell align="right">{item.order_total}</StyledTableCell>
                    </StyledTableRow>
                    </TableBody>
                );
            });

            var orderInfos_HTMLTABLE = "";
       
            orderInfos_HTMLTABLE = toShip.map( (item, index) => {
                return (
                    <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                            <StyledTableCell align="right">{item.firstname} {item.middlename} {item.lastname}</StyledTableCell>
                            <StyledTableCell align="right">{item.contactNo}</StyledTableCell>
                            <StyledTableCell align="right">{item.shippingaddress}</StyledTableCell>
                            <StyledTableCell align="right">{item.modeofpayment}</StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" sx={classes.ViewButton} onClick={outforDelivery}>
                            OUT FOR DELIVERY</Button></StyledTableCell>
                    </StyledTableRow>
                );
            });
           

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
                    <StyledTableCell align="right">Order ID</StyledTableCell>
                    <StyledTableCell align="right">Product Name</StyledTableCell>
                    <StyledTableCell align="right">Quantity&nbsp;(kg)</StyledTableCell>
                    <StyledTableCell align="right">Price per Kilo</StyledTableCell>
                    <StyledTableCell align="right">Total Price</StyledTableCell>
                </TableRow>
            </TableHead>
                {toShipOrder_HTMLTABLE}
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
                {orderInfos_HTMLTABLE}
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

export default OngoingDetails;