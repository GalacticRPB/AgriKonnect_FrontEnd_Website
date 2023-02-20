import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box, 
  Stack,
    Typography,
    Button,
    TableRow,
    TableBody,
    Toolbar, 
    styled,
    TableContainer,
    Paper,
    Table,
    TableHead,
    Fab,
    Grid
} from '@mui/material';
import { Image } from 'mui-image';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ResponsiveDrawer from '../components/Drawer';
import ScrollTop from '../components/ScrollToTop';


//ScreenSize
const drawerWidth = 240;

//Styles
const classes = {
    root: {
      backgroundColor: 'blue'
    },
    Welcome: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F645F',
      marginBottom: 2,
      textAlign: 'right',
    },
    Month: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F645F',
      marginBottom: 2,
    },
    ViewButton: {
        fontFamily: 'Poppins',
        margin: 1,
        color: "#FFFF",
        backgroundColor: '#374989'
    },
    SubmitButton: {
      fontFamily: 'Poppins',
      margin: 1,
      color: "#FFFF",
      backgroundColor: '#388E3C'
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

function ReportTable(props) {

    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState([]);
    const [inforeport, setinfoReport] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [count, setCount] = useState([]);
    const history = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('user', JSON.stringify(user))

    const id = user.id;

    console.log(report)
    console.log(inforeport)
    console.log(quantity)

    const total = report;
    const ordercount = count;
    useEffect(() => {


        axios.get(`http://agrikonnect.herokuapp.com/${id}`).then(res=>{
            if(res.status === 200)
            {
                setReport(res.data.price)
                setinfoReport(res.data.products)
                setQuantity(res.data.qty)
                setLoading(false);
            }
        });

        axios.get(`http://agrikonnect.herokuapp.com/${id}`).then(res=>{
            if(res.status === 200)
            {
                setCount(res.data.orderCount)
                setLoading(false);
            }
        });

    }, []);
    

    if(loading)
    {
        return <CircularProgress color="success" />
    }
    else
    {
        var report_HTMLTABLE = "";
       
        report_HTMLTABLE = inforeport.map( (item, index) => {
            return (
                <TableBody>
                <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell align="left">{item.order_name}</StyledTableCell>
                </StyledTableRow>
                </TableBody>
            );
        });

        var qty_HTMLTABLE = "";

        qty_HTMLTABLE = quantity.map((item, index) => {
            return (
                <TableBody>
                <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell align="right">{item.total_qty}</StyledTableCell>
                </StyledTableRow>
                </TableBody>
            );
        });
    }

    return (
        <>
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer/>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar id="back-to-top-anchor"/>
            <Typography variant='h4' sx={classes.Month}>
                Total Order Purchased for this Month: {ordercount}
            </Typography>
            <Grid container spacing={2}>
  <Grid item sm={6}>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="left">Product Name</StyledTableCell>
                </TableRow>
            </TableHead>
                  {report_HTMLTABLE}
            </Table>
             </TableContainer>
             </Grid>

             <Grid item sm={6}>
             <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="right">Total Quantity</StyledTableCell>
                </TableRow>
            </TableHead>
                  {qty_HTMLTABLE}
              </Table>
              </TableContainer>
              </Grid>
              </Grid>
              
              <Typography variant='h4' sx={classes.Welcome}>
                  Sales: Php {total}.00
              </Typography>
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

export default ReportTable;