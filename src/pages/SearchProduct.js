import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, 
    CssBaseline,
    GlobalStyles,
    Typography,
    Paper,
    Toolbar,
    Grid,
    ListItemText, 
    ListItemButton,
    Stack,
    styled,
    Button,
    IconButton,
    InputBase,} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
import { Image } from 'mui-image';
import CustomerResponsiveAppBar from "../components/CustomerResponsiveAppBar";

//ScreenSize
const drawerWidth = 240;
//Styles
const classes = {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: 20,
      textAlign: "center",
      color: "blue"
    },
    Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F645F',
      marginBottom: 5,
    },
    SearchButton: {
      fontFamily: 'Poppins',
      marginBottom: 5,
      backgroundColor: '#DCDCDC'
    },  
    Message: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#000000',
    },
    viewbutton:{
        backgroundColor:'#31A05F',
        padding: 1,
        "&:hover": {
          color: '#FFFF',
          backgroundColor: '#388E3C',
        },
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
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function SearchProduct() {

    const [table, setTable] = useState(null);
    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))
    const navigate = useNavigate();
    
    async function search(key) {
        console.warn(key)
        let result = await fetch("http://localhost:8000/api/search/"+key);
        console.log(result);
        result = await result.json();

 
        var productList = result.map((item, index) => {
            return(
                <Box sx={{ width: '100%', marginBottom: 1 }}>
                <Stack direction={{ xs: "column-reverse"}}  spacing={10}>
                  <Item key={index}>
                    <ListItemButton onClick={()=> navigate ((`/vegetables/${item.name}`),{state:item})} alignItems="flex-start">
                      <Image duration = {0} src={`http://localhost:8000/${item.image}`} height={50} width={50} />
                      <ListItemText primary={item.name} secondary={<Typography
                      sx={{ display: 'inline',
                      fontFamily: 'Poppins',
                      fontWeight: 'bold',
                      color: '#000000',}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                     Price: Php {item.price} .00
                     Seller: {item.seller_name}
                    </Typography>
                    } 
                      primaryTypographyProps={{ style: classes.producttitle }}
                      secondaryTypographyProps={{style: classes.productprice }}/>
                    </ListItemButton>
                  </Item>
                </Stack>
              </Box>
            );
        });
        setTable(productList)

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
            <Typography variant='h3' sx={classes.Header}>
              Hi, { customer.firstname} !
            </Typography>
            <Typography sx={classes.SubHeader}>
              What would you buy today?
            </Typography>
            <Box>
          <Paper component="form" elevation={1} sx={classes.SearchButton}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              onChange={(e)=>search(e.target.value)}
              sx={{ ml: 1, flex: 1, fontFamily: 'Poppins', }}
              placeholder="Search product"
              inputProps={{ 'aria-label': 'Search' }}
            />
          </Paper>
          <div style={classes.root}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                        {/*Render the InnerGrid as a child item */}
                        {table}
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </Box>
    </Box>
    </>
    )
}

export default SearchProduct;