import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Image } from 'mui-image';
import logo from '../assets/logo.png'


function ResponsiveAppBar() {
  return (
    <AppBar component="nav" sx={{backgroundColor: '#388E3C'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Image duration={0} src={logo} width={100} height={100}/>
          <Typography
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              fontSize: 30,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            AgriKOnnect
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: "inherit",
              textDecoration: "none"
            }}
          >
            AgriKOnnect
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
