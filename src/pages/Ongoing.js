import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Typography,
    Toolbar,
    Paper, 
    styled,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    Button,
    Box,
    ButtonGroup,
    Fab,} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ResponsiveDrawer from '../components/Drawer';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
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
  backgroundColor: '#388E3C',
  borderColor: '#FFFF',
  borderRadius: 2,
  color: '#FFFF',
  "&:hover": {
    color: '#FFFF',
    backgroundColor: '#6FCF97',
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
Message: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#000000',
},
SubMessage: {
    fontFamily: 'Poppins',
    color: '#000000',
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


function OngoingPage(props) 
{
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [toShip, setToShip] = useState();

    const navigate = useNavigate();
    
    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    useEffect(() => {

        axios.get(`http://agrikonnect.herokuapp.com/${user_id}`).then((res) => {
          if (res.status === 200) {
            setToShip(res.data.deliveries);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      console.log(toShip)
      
      if(loading)
        {
            return <CircularProgress color="success" />
        }

  

            var showOngoingOrders = "";
            showOngoingOrders = toShip.map( (item, idx) => {
                return(
                    <StyledTableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                            <StyledTableCell align="right">{item.order_id}</StyledTableCell>
                            <StyledTableCell align="right">{item.order_name}</StyledTableCell>
                            <StyledTableCell align="right">{item.order_qty}</StyledTableCell>
                            <StyledTableCell align="right">{item.order_price}.00</StyledTableCell>
                            <StyledTableCell align="right">{item.order_total}.00</StyledTableCell>
                            <StyledTableCell align="right">{item.firstname} {item.middlename} {item.lastname}</StyledTableCell>
                            <StyledTableCell align="right">{item.contactNo}</StyledTableCell>
                            <StyledTableCell align="right">{item.shippingaddress}</StyledTableCell>
                            <StyledTableCell align="right">{item.modeofpayment}</StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" sx={classes.ViewButton}>
                            In Transit</Button></StyledTableCell>
                    </StyledTableRow>
                )
            });

      
        
   
           

    return (
        <Box sx={{ display: 'flex' }}>
            <ResponsiveDrawer/>
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar id="back-to-top-anchor"/>
                <Typography variant='h3' sx={classes.Header}>
                Ongoing Transactions
                </Typography>
                <ButtonGroup sx={classes.positionButton}>
                    <Button sx={classes.OngoingButton} onClick={() => navigate('/transactions/ongoing')}>Ongoing</Button>
                    <Button sx={classes.DeliveredButton} onClick={() => navigate('/transactions/delivered')}>Delivered</Button>
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
                            {showOngoingOrders}
                    </Table>
                </TableContainer>
            </Box>
            <ScrollTop {...props}>
                <Fab sx= {classes.ScrollTopButton} size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Box>
    );

}

export default OngoingPage;