import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Button, 
    GlobalStyles,Toolbar, Typography,
    Paper, Fab, styled, List, Stack, ListItem, ListItemText} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import {useNavigate} from 'react-router-dom';
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
        color: '#FFFF'
    },
    HeaderSub: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        color: '#000000',
    },
  }

function ToPay(props) 
{
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [toPay, setToPay] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        if (Object.keys(customer).length === 0) {
            setCustomer(JSON.parse(localStorage.getItem('customer')))
        }
        
        axios.get(`http://agrikonnect.herokuapp.com/${customer.id}`).then(res=>{
            if(res.status === 200)
            {
                setToPay(res.data.toPay)
                setLoading(false);
            }
        });
        
      },[customer]);
      console.log(toPay)
      if(loading)
      {
          return <CircularProgress color="success" />
      }
      
      if(toPay.length > 0)
      {
        var showToPayList = "";
        showToPayList = toPay.map( (item, idx) => {
            return(
                <Box sx={{ width: '100%', marginBottom: 1 }}>
                <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                  <Item key={idx}>
                      <ListItem alignItems="flex-start">
                      <Image width="120px" alt={item.image} duration={0} src={`http://agrikonnect.herokuapp.com${item.image}`}/>
                      <ListItemText primary={item.order_name} secondary={<Typography
                      sx={{ display: 'inline',
                      fontFamily: 'Poppins',
                      fontWeight: 'bold',
                      color: '#000000',}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      >
                      {item.total_price}.00
                      </Typography>
                      } 
                      primaryTypographyProps={{ style: classes.producttitle }}
                      secondaryTypographyProps={{style: classes.productprice }}/>
                      </ListItem>
                      <Typography variant="contained" sx={classes.basketbutton}>
                        Product Status: Pending..
                      </Typography>
                  </Item>
                </Stack>
            </Box>
            )
        })
      }
      else {
        showToPayList =<Typography variant='h5' sx={classes.HeaderSub}>
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
                    <Button onClick={() => navigate('/customer-account')}>
                        <ArrowBackIcon sx = {classes.arrowback}/>
                    </Button>
                    <Typography variant='h3' sx={classes.Header}>
                    To Pay
                    </Typography>
                </Stack>
                <List>
                    {showToPayList}
                </List>
                <ScrollTop {...props}>
                    <Fab sx= {classes.ScrollTopButton} size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </Box>
        </Box>
    </>
    )

}

export default ToPay;