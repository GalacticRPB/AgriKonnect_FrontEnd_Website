import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Image } from 'mui-image';
import {useNavigate} from 'react-router-dom';
import logo from '../assets/logo.png';

const drawerWidth = 240;

function CustomerResponsiveAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const navItems = [
    {
      text: 'HOME',
      path: '/customer-homepage'
    },
    {
      text: 'BASKET',
      path: '/basket'
    },
    { 
      text: 'ACCOUNT',
      path: '/customer-account'
    }];

  const classes = {
    navbarbutton: {
      fontSize: 20,
      padding: 5,
      fontFamily: 'Poppins',
      fontWeight: 'bold', color:'#5F5B5B',
      "&:hover": {
        color: '#388E3C',
        backgroundColor: '#F4F4F4',
      },
    }
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', }}>
      <Typography variant="h6" sx={{ my: 2,fontFamily: 'Poppins',
        fontWeight: 'bold',color:'#388E3C' }}>
        AgriKOnnect
      </Typography>
      <Divider />
      <List>
        {navItems.map((item,index) => {
          const {text, path} = item;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton sx={{ textAlign: 'center', color:'#5F5B5B', "&:hover": {
                  color: '#388E3C',}}} onClick={() => navigate(path)}>
                <ListItemText primary={text} primaryTypographyProps={{fontFamily: 'Poppins',
                fontWeight: 'bold'}} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" elevation={0} sx={{backgroundColor:'#F4F4F4'}}>
        <Toolbar>
          <IconButton
            color="#5F5B5B"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Image duration={0} src={logo} width={100} height={100}/>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },fontFamily: 'Poppins',
            fontWeight: 'bold', color:'#388E3C',fontSize: 25, }}
          >
            AgriKOnnect
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item,index) => {
              const {text, path} = item;
              return (
                <Button key={index} sx={classes.navbarbutton} onClick={() => navigate(path)}>
                    {text}
                  </Button>
              );
          })}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            fontFamily: 'Poppins',
              fontWeight: 'bold', color:'#5F5B5B',
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default CustomerResponsiveAppBar;
