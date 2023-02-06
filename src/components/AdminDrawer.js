import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Image } from 'mui-image';
import logo from '../assets/logo.png';
import {useNavigate} from 'react-router-dom';

const drawerWidth = 240;

const hover = {
    "&:hover": {
      color: '#388E3C',
      backgroundColor: 'white',
    },
  };
const texttitle = {
    fontFamily: 'Poppins',
    fontWeight: 'bold'
};

function AdminResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const history = useNavigate();
  const itemsList = [
    {
      text: "UNVERIFIED",
      path: '/admin-unverified',
    },
    {
      text: "VERIFIED",
      path: '/admin-verified',
    },
];

  const drawer = (
    <div>
      <Image sx={{marginLeft: '20px'}} src={logo} height={190} width={190} />
      <Divider />
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, path} = item;
          return (
            <ListItem sx={hover} button key={index} onClick={() => history(path)}>
              <ListItemText primary={text} primaryTypographyProps={{ style: texttitle }}/>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#ffff',
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          PaperProps={{
            sx: {
                backgroundColor: "#388E3C",
                color: "white",
            }
        }}
        >
          {drawer}
        </Drawer>
        <Drawer
            PaperProps={{
                sx: {
                    backgroundColor: "#388E3C",
                    color: "white",
                }
            }}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

AdminResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default AdminResponsiveDrawer;