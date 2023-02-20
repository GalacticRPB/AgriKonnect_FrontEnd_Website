import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


import CircularProgress from '@mui/material/CircularProgress';
import { Box, CssBaseline, Button, 
    GlobalStyles, Toolbar, Typography,
    Paper, Fab,styled,
    List, Stack, ListItem, ListItemText} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    reviewbutton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
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

function ToReviewPage(props) 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [toReview, setReview] = useState(state);

    const navigate = useNavigate();

    let customer = JSON.parse(localStorage.getItem('user-info'))
    const user_id = customer.id;

    useEffect(() => {

        axios.get(`http://agrikonnect.herokuapp.com/${user_id}`).then((res) => {
          if (res.status === 200) {
            setReview(res.data.delivered);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      console.log(toReview)
      
      if(loading)
        {
            return <CircularProgress color="success" />
        }

        if (toReview.length > 0)
        {
            var showToReviewOrders = "";
            showToReviewOrders = toReview.map( (item, idx) => {
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
                            <Button variant="contained" onClick={() => navigate(`/to-review-item/${item.order_id}`,{state:item})} sx={classes.reviewbutton}>REVIEW</Button>
                            </ListItem>
                        </Item>
                    </Stack>
                    </Box>
                )
            });

        }

        else {
            showToReviewOrders =<Typography variant='h5' sx={classes.HeaderSub}>
            No Orders to Review
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
                    <Button onClick={() => navigate('/customer-account')}>
                        <ArrowBackIcon sx = {classes.arrowback}/>
                    </Button>
                    <Typography variant='h3' sx={classes.Header}>
                    My Orders to Review
                    </Typography>
                </Stack>
                <List>
                {showToReviewOrders}
                </List>
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

export default ToReviewPage;