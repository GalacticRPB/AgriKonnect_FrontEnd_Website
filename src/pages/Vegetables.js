
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Box, CssBaseline, Button, 
    GlobalStyles, IconButton, Toolbar, Typography,
    Paper, Fab, styled, Grid, ListItemIcon, 
    List, Stack, ListItemButton, ListItemText} from "@mui/material";
  import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
  import SearchIcon from '@mui/icons-material/Search';
  import {useNavigate} from 'react-router-dom';
  import vegetables from '../assets/vegetables.png';
  import fruits from '../assets/fruit.png';
  import { Image } from 'mui-image';
  import * as BsIcon from "react-icons/bs";
  import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
  import CircularProgress from '@mui/material/CircularProgress';
  import ScrollTop from '../components/ScrollToTop';
  
  
  //Styles
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
    SubHeader: {
      fontFamily: 'Poppins',
      color: '#5F5B5B',
      fontSize: 25,
      marginBottom: 5,
    },
    CategoriesButton: {
      color: '#FFFF',
      fontSize: 25,
      marginBottom: 5,
      backgroundColor:'#31A05F',
      borderRadius: 2,
      "&:hover": {
        color: '#31A05F',
        backgroundColor: '#ADE792',
      },
    },
    CategoriesTitle:{
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#FFFF',
      fontSize: 25,
      borderRadius: 2,
      textAlign: 'center',
      "&:hover": {
        color: '#31A05F',
        backgroundColor: '#ADE792',
      },
    },
    VeggiesButton:{
      fontSize: 25,
      marginBottom: 5,
      backgroundColor:'#ADE792',
      borderRadius: 2,
      "&:hover": {
        color: '#FFFF',
        backgroundColor: '#31A05F',
      },
    },
    SearchButton: {
      fontFamily: 'Poppins',
      marginBottom: 3,
      backgroundColor: '#FFFFFF'
    },
    ButtonTitle: {
      fontFamily: 'Poppins',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFF',
      textAlign: 'center'
    },
    basketbutton:{
      backgroundColor:'#31A05F',
      padding: 1,
      "&:hover": {
        color: '#FFFF',
        backgroundColor: '#388E3C',
      },
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
  }


function VegetablePage(props)
{
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);

    const productCount = data.length;
    const navigate = useNavigate();
    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))

    useEffect(() => {
        axios.get(`http://localhost:8000/api/vegetable`).then((res) => {
          if (res.status === 200) {
            setData(res.data.products);
            setLoading(false);
          }
        });

        
      }, []);
      console.log(data)
    if(loading)
    {
        return <CircularProgress color="success" />
    }
    else
    {
        var showVegetableList = "";
        if(productCount)
        {
            showVegetableList = data.map( (item, idx) => {
                return(
                    <Box sx={{ width: '100%', marginBottom: 1 }}>
                    <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                      <Item key={idx}>
                        <ListItemButton onClick={() => navigate(`/vegetables/${item.name}`,{state:item})} alignItems="flex-start">
                          <Image duration={0} src= {`http://localhost:8000/${item.image}`} width="120px" alt={item.image}/>
                          <ListItemText primary={item.name} secondary={<Typography
                          sx={{ display: 'inline',
                          fontFamily: 'Poppins',
                          fontWeight: 'bold',
                          color: '#388E3C',}}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Price: Php {item.price}.00
                          <br></br>Seller: {item.seller_name}
                        </Typography>
                        } 
                          primaryTypographyProps={{ style: classes.producttitle }}
                          secondaryTypographyProps={{style: classes.productprice }}/>
                        </ListItemButton>
                      </Item>
                    </Stack>
                  </Box>
                )
            });
        }
        else
        {
            showVegetableList = <div className='col-md-12'>
                <h4>No Product Available for {data.name}</h4>
            </div>
        }
        /*var product_HTMLTABLE = "";
       
        product_HTMLTABLE = data.map( (item, index) => {
            return (
            
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                </tr>
            );
        });*/
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
        <Typography variant='h3' sx={classes.Header}>
          Hi, {customer.firstname}!
        </Typography>
        <Typography sx={classes.SubHeader}>
          What would you buy today?
        </Typography>
        <Box>
            <Button fullWidth onClick={() => navigate('/searchproduct')} elevation={1} sx={classes.SearchButton}>
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <SearchIcon />
                </IconButton>
                <Button
                  sx={{ ml: 1, flex: 1, fontFamily: 'Poppins', }}
                  placeholder="Search by item name"
                  inputProps={{ 'aria-label': 'Search' }}
                />
            </Button>
        </Box>
        <Typography variant='h4' sx={classes.Header}>
              Categories
            </Typography>
            <br></br>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <ListItemButton onClick={() => navigate('/vegetables')} sx={classes.VeggiesButton}>
                <Image duration={0} height={50} width={50} src={vegetables}/>
                  <ListItemText primary= {<Typography
                          sx={{ display: 'inline',
                          fontFamily: 'Poppins',
                          fontWeight: 'bold',
                          margin: 3,
                          fontSize: 20,
                          color: '#31A05F',
                          "&:hover": {
                            color: '#FFFF',
                            backgroundColor: '#31A05F',
                          },}}
                        >
                          VEGETABLES
                        </Typography>
                        }></ListItemText>
                </ListItemButton>
              </Grid>
              <Grid item xs>
              <ListItemButton onClick={() => navigate('/fruits')} sx={classes.CategoriesButton}>
                  <Image duration={0} height={50} width={50} src={fruits}/>
                  <ListItemText primary={<Typography
                          sx={{ display: 'inline',
                          fontFamily: 'Poppins',
                          fontWeight: 'bold',
                          margin: 3,
                          fontSize: 20,
                          color: '#FFFF',
                          "&:hover": {
                            color: '#31A05F',
                            backgroundColor: '#ADE792',
                          },}}
                        >
                          FRUITS
                        </Typography>
                        }></ListItemText>
                </ListItemButton>
              </Grid>
            </Grid>
        <List>
        {showVegetableList}
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

export default VegetablePage;