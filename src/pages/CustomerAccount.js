import React from 'react';
import { Box, CssBaseline, 
    GlobalStyles, Button, Toolbar, Typography,
    Divider, ListItemButton,styled,ListItemIcon, 
    List, Stack, Paper, ListItemText} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import {useNavigate} from 'react-router-dom';
import * as FaIcon from "react-icons/fa";

//Icons
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CallReceivedIcon from '@mui/icons-material/CallReceived';


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
    },
    position:{
      display: 'flex',
      alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonTitle:{
      fontFamily: 'Poppins',
      color: '#5F5B5B',
    },
    buttonhover:{
      "&:hover": {
        backgroundColor: '#F4F4F4',
      },
    },
    Icon: {
      "&:hover": {
        color: '#FFFF',
      },
    },
    ButtonContainer:{
      fontFamily: 'Poppins',
      backgroundColor:'#FFFF',
      color: '#3E3D3D',
      padding: 1,
      "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
     },
    },
    ArrowRight:{
      marginLeft: 20,
      "&:hover": {
        color: '#FFFF',
      },
    },
    LoginTitleButton:{
      marginLeft: 4,
    }
}

  //Storing of data for buttons
  const ButtonList = [
    {
      name: "To Pay",
      path: '/toPay',
      icon: <AccountBalanceWalletIcon sx={classes.Icon}/>,
      backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
  },
    {
        name: "To Receive",
        path: '/toreceive',
        icon: <CallReceivedIcon sx={classes.Icon}/>,
        backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
    },
    {
        name: "To Review",
        path: '/toreview',
        icon: <BorderColorIcon sx={classes.Icon}/>,
        backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
    },
    {
      name: "Recent Transactions",
      path: '/customer-recent',
      icon: <ReceiptLongIcon sx={classes.Icon}/>,
      backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
    },
    {
      name: "Review",
      path: '/customer-review',
      icon: <RateReviewIcon sx={classes.Icon}/>,
      backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
    },
  ];

function CustomerAccount() 
{
    let customer = JSON.parse(localStorage.getItem('user-info'))
    const history = useNavigate();

    function logoutCustomer()
    {
        localStorage.clear();
        history("/login-customer");
    }

    return(
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
          <Box sx={classes.position}>
            <Button  onClick={() => history('/edit-customeraccount',{state:customer})}>
              <Box sx={{backgroundColor: '#D9D9D9', p: 5}}>
                <FaIcon.FaUserEdit color = {'#388E3C'} size={100}/>
              </Box>
            </Button>
          </Box>
          <Box sx={classes.position}>
              <Typography variant='h3' sx={classes.Header}>
                {customer.firstname}
              </Typography>
          </Box>
          <Box sx={classes.position}>
              <Typography sx={classes.SubHeader}>
              {customer.username}
              </Typography>
          </Box>
            <Divider/>
            {/* Buttons for transactions, discounts etc.. */}
            <List>
              {ButtonList.map((item, index) => {
                const { name,backicon, icon, path} = item;
                return (
                  <Box sx={{ width: '100%', marginBottom: 1 }}>
                    <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                      <Item sx={classes.ButtonContainer} key={index}>
                        <ListItemButton onClick={() => history(path)}>
                          {icon && <ListItemIcon>{icon}</ListItemIcon>}
                          <ListItemText primaryTypographyProps={classes.TitleButton} primary={name}/>
                          {backicon && <ListItemIcon>{backicon}</ListItemIcon>}
                        </ListItemButton>
                      </Item>
                    </Stack>
                  </Box>
                );
                })}
          </List>
          <Box sx={{ width: '100%', marginBottom: 1 }}>
              <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                  <Box sx={{boxShadow: 2, 
                  fontFamily: 'Poppins',
                  backgroundColor:'#FFFF',
                  color: '#3E3D3D',
                  padding: 1,
                  borderRadius: 1,
                  "&:hover": {
                    color: '#FFFF',
                    backgroundColor: '#388E3C',}}}>
                      <ListItemButton onClick={logoutCustomer}>
                          <LogoutIcon sx={classes.Icon}/>
                          <ListItemText primaryTypographyProps={classes.LoginTitleButton} primary={" Logout"}/>
                          <KeyboardArrowRightIcon sx={classes.ArrowRight}/>
                      </ListItemButton>
                  </Box>
              </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CustomerAccount;