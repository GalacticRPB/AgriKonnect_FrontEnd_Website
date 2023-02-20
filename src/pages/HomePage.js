import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, 
    Typography,
    Toolbar,
    Stack,
    Paper, 
    styled,
    List,
    ListItem,
    ListItemText,
    Fab,} from '@mui/material';
import ResponsiveDrawer from '../components/Drawer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScrollTop from '../components/ScrollToTop';
import { BarChart, BarSeries } from 'reaviz';

//ScreenSize
const drawerWidth = 240;

//Styles
const classes = {
  root: {
    backgroundColor: 'blue'
  },
  Welcome: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#5F645F',
    marginBottom: 2,
  },
  Header: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#5F645F',
    marginBottom: 2,
  },
  SubHeader: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#31A05F',
    marginTop: 5,
    marginBottom: 2,
  },
  SubTitle: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#31A05F',
    marginTop: 2,
    marginBottom: 2,
  },
  producttitle: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  productsub : {
    fontFamily: 'Poppins',
    marginLeft: 5,
  },
  viewbutton: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    backgroundColor:'#31A05F',
    padding: 1,
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
    },
  },
  ScrollTopButton:{
    color: 'white',
    backgroundColor: '#4DA351',
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#31A05F',
    },
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Homepage = (props) =>
{
  const [sold, setSold] = useState([]);
  const [visual, setVisual] = useState([]);
  let user = JSON.parse(localStorage.getItem('user-info'))
  localStorage.setItem('user', JSON.stringify(user))

  const user_id = user.id;

  useEffect(() => {

    axios.get(`http://agrikonnect.herokuapp.com/${user_id}`).then((res) => {
      if (res.status === 200) {
        setVisual(res.data.data);
      }
    });

      axios.get(`http://agrikonnect.herokuapp.com/${user_id}`).then((res) => {
        if (res.status === 200) {
          setSold(res.data.sellerdelivered);
        }
      });

    }, [user_id]);

    const barChartData = [
      {key: "November", data:visual[0] },
      {key: "December", data:visual[1] },
    ];

    console.log(sold)

    var showRecentSold = "";
      showRecentSold = sold.map((item, idx) => {
        return (
          <Box sx={{ width: '100%', marginBottom: 1 }}>
          <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
            <Item key={idx}>
              <ListItem>
                <ListItemText primary={item.order_name} secondary={item.order_price}
                primaryTypographyProps={{ style: classes.producttitle }}
                />
              </ListItem>
            </Item>
          </Stack>
        </Box>
        )
      })

    return(
      <>
      <Box sx={{ display: 'flex' }}>
      <ResponsiveDrawer/>
      <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar id="back-to-top-anchor"/>
            <Typography variant='h2' sx={classes.Welcome}>
              Welcome, {user.firstname}!
            </Typography>
            <Typography variant='h3' sx={classes.Header}>
              Dashboard
            </Typography>
            <Box m="20px">
              <Typography variant='h5' sx={classes.SubTitle}>
                  Sales Report
              </Typography>
              <Paper elevation={5} sx={{backgroundColor: '#FFFF', borderRadius: 2}}>
              <Box height="90vh" variant="outlined">
              <div class="container" style = {{ alignSelf: 'center', marginTop: '30px' }}>
                <div class="row justify-content-between">
                    <div class="col-4" style = {{ alignSelf: 'center', marginTop: '80px' }}>
                        <BarChart 
                        width={800} 
                        height={500} 
                        data={barChartData} 
                        series = {
                            <BarSeries
                            colorScheme='green'
                            />
                        }
                        />
                    </div>
                </div>
            </div>
              </Box>
              </Paper>
            </Box>
            <Typography variant='h4' sx={classes.SubHeader}>
              Recent Sold
            </Typography>
              <List>
              {showRecentSold}
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

export default Homepage;