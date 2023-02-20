import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Button, 
    GlobalStyles,  Toolbar, Typography,
    Paper, Fab, styled, 
    List, Stack, ListItem, ListItemText} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollToTop';
import { Image } from 'mui-image';
import CircularProgress from '@mui/material/CircularProgress';


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
    HeaderSub: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        color: '#000000',
    },
}

function CustomerRecentPage(props) 
{
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState();
    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    useEffect(() => {

        axios.get(`http://agrikonnect.herokuapp.com/${user_id}`).then((res) => {
          if (res.status === 200) {
            setRecent(res.data.recent);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      
      if(loading)
        {
            return <CircularProgress color="success" />
        }

        if (recent.length > 0)
        {
            var showRecentPurchase = "";
            showRecentPurchase = recent.map( (item, idx) => {
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
                    </Item>
                    </Stack>
                </Box>
            )});

        }

        else {
            showRecentPurchase = <Typography variant='h5' sx={classes.HeaderSub}>
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
                    Recent Transactions
                    </Typography>
                </Stack>
                <List>
                   {showRecentPurchase}
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

export default CustomerRecentPage;