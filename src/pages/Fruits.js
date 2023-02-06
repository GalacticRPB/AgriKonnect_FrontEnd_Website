
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';
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



//List of Categories Containers
function InnerGrid() {
    const navigate = useNavigate();
    return (
      <>
      {CategoriesButton.map((item, index) => {
        const { name, image,path} = item;
          return (
            <Box>
                <Grid item xs={4} rowSpacing={1} key={index}>
                   <Button onClick={() => navigate(path)}>
                      <Box component="span" sx={{ p: 4, 
                        backgroundColor: '#31A05F',
                        borderRadius: 4,
                        width: 350,
                        height: 250, 
                        m: 3,
                        "&:hover": {
                          color: '#FFFF',
                          backgroundColor: '#388E3C',
                        }, }}>
                        {image && <ListItemIcon>{image}</ListItemIcon>}
                        {name && <Typography sx={classes.ButtonTitle}>{name}</Typography>}
                      </Box>
                    </Button>
                </Grid>
              </Box>
          );
      })}
      </>
    );
  }

const CategoriesButton = [
    {
      name: "Vegetables",
      path: '/vegetables',
      image: <Image duration = {0} src={vegetables} sx={classes.positionImage} height={150} width={150} />,
    },
    {
      name: "Fruits",
      path: '/fruits',
      image: <Image duration = {0} src={fruits} sx={classes.positionImage} height={150} width={150} />,
    },
  ];


function FruitPages(props)
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const productCount = data.length;
    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/fruit`).then((res) => {
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
        var showProductList = "";
            showProductList = data.map( (item, idx) => {
                return(
                    <Box sx={{ width: '100%', marginBottom: 1 }}>
                    <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                      <Item key={idx}>
                        <ListItemButton onClick={() => navigate(`/fruits/${item.name}`,{state:item})} alignItems="flex-start">
                          <Image duration={0} src= {`http://localhost:8000/${item.image}`} width="120px" alt={item.image}/>
                          <ListItemText primary={item.name} secondary={<Typography
                          sx={{ display: 'inline',
                          fontFamily: 'Poppins',
                          fontWeight: 'bold',
                          color: '#000000',}}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Price: Php {item.price}.00
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
        {/* Containers of Buttons */}
        <div style={classes.root}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={0}>
              {/*Render the InnerGrid as a child item */}
              <InnerGrid />
            </Grid>
          </Grid>
        </div>
        <Typography variant='h4' sx={classes.Header}>
          Fruits
        </Typography>
        <List>
        {showProductList}
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

export default FruitPages;