import React  from 'react';
import { Box, 
    Divider, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    Stack,
    Paper, 
    styled,
    ListItemText, 
    Typography, 
    Button, 
    DialogTitle,
    Dialog,
    DialogActions } from '@mui/material';
  import ResponsiveDrawer from '../components/Drawer';
  import Toolbar from '@mui/material/Toolbar';
  //Icons
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  import HttpsIcon from '@mui/icons-material/Https';
  import ReviewsIcon from '@mui/icons-material/Reviews';
  import LogoutIcon from '@mui/icons-material/Logout';
  import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
  import {useNavigate} from 'react-router-dom';

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
    color: '#5F645F',
  },
  container: {
    display: 'flex',
    direction: 'row',
  },
  UserIcon: {
    color: '#959595',
    width: 200,
    height: 200,
    marginLeft: 10,
    marginRight: 4,
  },
  Nameuser: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 5,
    color: '#3E3D3D'
  },
  Username: {
    fontFamily: 'Poppins',
    mb: 1.5,
    fontSize: 25,
    marginTop: 10,
    marginLeft: -10,
    color: '#3E3D3D',
  },
  ButtonContainer:{
    fontFamily: 'Poppins',
    marginTop: 1,
    borderRadius: 3,
    backgroundColor:'#FFFF',
    padding: 1,
    "&:hover": {
    color: '#FFFF',
    backgroundColor: '#388E3C',
   },
  },
  TitleButton:{
    fontFamily: 'Poppins',
    color: '#00000',
    "&:hover": {
    color: '#FFFF',
    backgroundColor: '#388E3C',
    },
  },
  Icon: {
    "&:hover": {
      color: '#FFFF',
    },
  },
  ArrowRight:{
    marginLeft: 20,
    "&:hover": {
      color: '#FFFF',
    },
  },
  Button: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#FFFF',
    borderRadius: 1,
    padding: 1,
    backgroundColor: '#388E3C',
    "&:hover": {
        color: '#FFFF',
        backgroundColor: '#388E3C',
        },
    }
}

function AccountPage() 
{
    let user = JSON.parse(localStorage.getItem('user-info'))
    const history = useNavigate();

    function logout()
    {
        localStorage.clear();
        history('/seller/login')
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //Storing of data for buttons
    const ButtonList = [
        {
        name: "Personal Information",
        path: '/edit-account/',
        icon: <AccountCircleIcon sx={classes.Icon}/>,
        backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
        },
        {
        name: "Password",
        path: `/edit-password`,
        icon: <HttpsIcon sx={classes.Icon}/>,
        backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
        },
        {
        name: "Review",
        path: '/review',
        icon: <ReviewsIcon sx={classes.Icon}/>,
        backicon: <KeyboardArrowRightIcon sx={classes.ArrowRight}/>,
        },
    ];
    return (
        <Box sx={{ display: 'flex' }}>
      <ResponsiveDrawer/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={classes.container}>
          <AccountCircleIcon sx={classes.UserIcon}/>
          <Typography sx={classes.Nameuser}> {user.firstname} </Typography>
          <Typography sx={classes.Username}> {user.email} </Typography>
        </Box>
        <Divider/>
        <Box>
        <List>
            {ButtonList.map((item, index) => {
                const { name,backicon, icon, path} = item;
                return (
                  <Box sx={{ width: '100%', marginBottom: 1 }}>
                    <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                      <Item sx={classes.ButtonContainer} key={index}>
                        <ListItemButton onClick={() => history(path,{state:user})}>
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
          <Box sx={{ width: '100%'}}>
                <Stack direction={{ xs: "column-reverse"}}>
                      <Item sx={classes.ButtonContainer}>
                        <ListItemButton onClick={logout}>
                          <ListItemIcon> <LogoutIcon sx={classes.Icon}/></ListItemIcon>
                          <ListItemText primaryTypographyProps={classes.TitleButton} primary={'Logout'}/>
                          <ListItemIcon><KeyboardArrowRightIcon sx={classes.ArrowRight}/></ListItemIcon>
                        </ListItemButton>
                      </Item>
                </Stack>
            </Box>
          <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to log-out?"}
            </DialogTitle>
            <DialogActions>
              <Button sx={classes.Button} onClick={handleClose}>Yes</Button>
              <Button sx={classes.Button} onClick={() => history('/account')}>
                No
              </Button>
            </DialogActions>
          </Dialog>
          </div>
        </Box>
      </Box>
    </Box>
    );

}

export default AccountPage;