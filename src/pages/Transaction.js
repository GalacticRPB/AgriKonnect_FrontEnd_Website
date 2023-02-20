import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Box, 
  Button,
  ButtonGroup,
  Typography,
  Toolbar,
  Paper, 
  styled,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
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
  marginBottom: 5,
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

function TransactionPage(props) 
{
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    console.log(orders)

    useEffect(() => {
        
        axios.get(`http://agrikonnect.herokuapp.com/${user_id}`).then((res) => {
          if (res.status === 200) {
            setOrders(res.data.orders);
            setLoading(false);
          }
        });
        
      }, [user_id]);
    
    const outfordelivery = (e) => {
      e.preventDefault();

      const submitOrder = {
          product_id: orders[0]?.product_id,
          seller_id: user_id,
          customer_id: orders[0]?.user_id,
          order_id: orders[0]?.id,
          order_name: orders[0]?.order_name,
          order_qty: orders[0]?.product_qty,
          order_price: orders[0]?.price,
          order_total: orders[0]?.total_price,
          firstname: orders[0]?.firstname,
          middlename: orders[0]?.middlename,
          lastname: orders[0]?.lastname,
          mobilephone: orders[0]?.mobilephone,
          shippingaddress: orders[0]?.shippingaddress,
          modeofpayment: orders[0]?.modeofpayment,
          
      }

      axios.post(`http://agrikonnect.herokuapp.com`, submitOrder).then(res=> {
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

        //if (order_items.length > 0)
        //{
            var showOrderList = "";
            showOrderList = orders.map( (item, idx) => {
                return(
                  <TableBody>
                  <StyledTableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>
                      <StyledTableCell align="right">{item.order_name}</StyledTableCell>
                      <StyledTableCell align="right">{item.product_qty}</StyledTableCell>
                      <StyledTableCell align="right">{item.price}.00</StyledTableCell>
                      <StyledTableCell align="right">{item.total_price}.00</StyledTableCell>
                      <StyledTableCell align="right">{item.firstname} {item.middlename} {item.lastname}</StyledTableCell>
                      <StyledTableCell align="right">{item.mobilephone}</StyledTableCell>
                      <StyledTableCell align="right">{item.shippingaddress}</StyledTableCell>
                      <StyledTableCell align="right">{item.modeofpayment}</StyledTableCell>
                      <StyledTableCell align="right"><Button variant="contained" sx={classes.ViewButton} onClick={outfordelivery}>
                        OUT FOR DELIVERY</Button></StyledTableCell>
                  </StyledTableRow>
                  </TableBody>
                )
            });

    return (
      <>
      <Box sx={{ display: 'flex' }}>
          <ResponsiveDrawer/>
          <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
          <Toolbar id="back-to-top-anchor"/>
          <Typography variant='h3' sx={classes.Header}>
          Transactions
          </Typography>
          <ButtonGroup sx={classes.positionButton}>
          <Button sx={classes.OngoingButton} onClick={() => history('/transactions/ongoing')}>Ongoing</Button>
          <Button sx={classes.DeliveredButton} onClick={() => history('/transactions/delivered')}>Delivered</Button>
          </ButtonGroup>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
              <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="right">Product Name</StyledTableCell>
              <StyledTableCell align="right">Quantity&nbsp;(kg)</StyledTableCell>
              <StyledTableCell align="right">Unit Price</StyledTableCell>
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="right">Customer Name</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">Shipping Address</StyledTableCell>
              <StyledTableCell align="right">Mode of Payment</StyledTableCell>
              <StyledTableCell align="right">Shipping Status</StyledTableCell>
              </TableRow>
          </TableHead>
            {showOrderList}
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

export default TransactionPage;