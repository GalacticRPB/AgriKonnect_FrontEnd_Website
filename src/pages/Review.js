import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom';
import { Box, CssBaseline, Button, 
  GlobalStyles, Table, Toolbar, Typography,
  Paper, styled, Stack,  TableHead,
  TableRow,TableContainer,
  TableBody,Fab} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {useNavigate} from 'react-router-dom';
import ResponsiveDrawer from '../components/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollToTop';
import CircularProgress from '@mui/material/CircularProgress';

//ScreenSize
const drawerWidth = 240;

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

function Review(props) 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState([]);

    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem('user-info'))
    const id = user.id;

    console.log(review)

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/review/${id}`).then((res) => {
          if (res.status === 200) {
            setReview(res.data.review);
            setLoading(false);
          }
        });
        
      }, [id]);
      
      
      if(loading)
        {
            return <CircularProgress color="success" />
        }

        /*if (order_items.length > 0)
        {*/
            var showReviewPage = "";
            showReviewPage = review.map( (item, idx) => {
                return(
                  <StyledTableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <StyledTableCell align="left">{item.order_name}</StyledTableCell>
                  <StyledTableCell align="left">{item.review}</StyledTableCell>
                </StyledTableRow>
                )
            });

        //}

        /*else {
            showOrderList =<div>
                <div className='card card-body py05 text-center shadow-sm'>
                <h4></h4>
                <h6>No Available transaction</h6>
            </div>
        </div>
        }*/
   
           

    return (
      <>
     <Box sx={{ display: 'flex' }}>
      <ResponsiveDrawer/>
      <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar id="back-to-top-anchor"/>
              <Stack direction='row'>
                  <Button onClick={() => navigate('/account')}>
                      <ArrowBackIcon sx = {classes.arrowback}/>
                  </Button>
                  <Typography variant='h3' sx={classes.Header}>
                  Reviews
                  </Typography>
              </Stack>
              <Stack>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                          <TableRow>
                          <StyledTableCell align="left">Product Name</StyledTableCell>
                          <StyledTableCell align="left">Review</StyledTableCell>
                          </TableRow>
                      </TableHead>
                        <TableBody>
                          {showReviewPage}
                        </TableBody>
                      </Table>
                  </TableContainer>
               </Stack>
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

export default Review;