import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Box, CssBaseline, Button, 
    GlobalStyles,  Rating, Toolbar, Typography,
    Paper, TextField, styled, 
    Stack,} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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
    SubmitButton: {
      fontFamily: 'Poppins',
      marginTop: 3,
      marginBottom: 5,
      color: "#FFFF",
      backgroundColor: '#388E3C'
    },
    ButtonTitle: {
      fontFamily: 'Poppins',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFF',
      textAlign: 'center'
    },
    illustration:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      color: '#000000',
    },
}

function ReviewForm() 
{
    const history = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [toReview, setReview] = useState([]);

    const order_id = state.order_id;
    const productName = state.order_name;
    const orderTotal = state.order_total;

    console.log(order_id)
    const [reviewInput, setReviewInput] = useState({
        review: '',
    });

    const [error, setError] = useState([]);

      console.log(state)

      const handleInput = (e) => {
        e.persist();
        setReviewInput({...reviewInput, [e.target.name]: e.target.value});
      }

      const submitReview = (e) => {
        e.preventDefault();
        
        const reviews = {
            customer_id: state.customerId,
            product_id: state.product_id,
            seller_id: state.seller_id,
            firstname: state.firstname,
            middlename: state.middlename,
            lastname: state.lastname,
            order_id: order_id,
            order_name: state.order_name,
            order_qty: state.order_qty,
            order_total: state.order_total,
            review: reviewInput.review,
        }

        axios.post(`http://localhost:8000/api/review`, reviews).then(res=> {
            if(res.data.status === 200)
            {
                swal("Review Submitted", res.data.message, "Success")
                setError([]);
                history('/toReview');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory", "", "error");
                setError(res.data.errors);
            }
        });
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
                    <Button onClick={() => history('/toreview')}>
                        <ArrowBackIcon sx = {classes.arrowback}/>
                    </Button>
                    <Typography variant='h3' sx={classes.Header}>
                    Write Review
                    </Typography>
                </Stack>
                <Stack direction='column'>   
                    <Box sx = {classes.illustration}>
                        <Typography variant='h5' sx={classes.producttitle}>
                        {productName}
                        </Typography>
                    </Box>
                    <Box sx = {classes.illustration}>
                        <Typography variant='h5' sx={classes.productprice}>
                        Php {orderTotal}.00
                        </Typography>
                    </Box>
                    <Box sx = {classes.illustration}>
                        <Typography sx={classes.productprice}>
                        What's your product experience?
                        </Typography>
                    </Box>
                    <Box sx = {classes.illustration}>
                        <input type="text" name="review" onChange={handleInput} value={reviewInput.review}  className="form-control" placeholder='Enter your review here' />
                        <small className='text-danger'>{error.review}</small>
                    </Box>
                        <Box sx = {classes.illustration}>
                        <Button sx={classes.SubmitButton} aria-label="add" onClick={submitReview}>
                            SUBMIT
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>  
    </>
    );

}

export default ReviewForm;