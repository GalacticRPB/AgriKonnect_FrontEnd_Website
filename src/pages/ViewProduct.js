import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Box, 
    Button,
    Typography,
    Grid,
    Toolbar,
    Paper,
    Stack,
    ListItem,
    ListItemText,
    IconButton,
    InputBase,
    Fab} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ResponsiveDrawer from '../components/Drawer';
import { Image } from 'mui-image';
import AddIcon from '@mui/icons-material/Add';
import Ecommerce from '../assets/e-commerce-empty.png';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
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
  AddButton:{
    backgroundColor: '#31A05F',
    position:'fixed',
    bottom:40,
	  right:40,
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
    },
  },
  addIcon: {
    color: '#FFFF',
  },
  positionImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    duration: 0,
  },
  positionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  EditButton: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    backgroundColor:'#F5E12A',
    color: '#000000',
    padding: 1,
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#388E3C',
    },
  },
  ProductTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'
  },
  QuantityTitle: {
    fontFamily: 'Poppins',
    color: '#000000',
    textAlign: 'center'
  },
  HeaderSub: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    color: '#5F645F',
    marginLeft: 10,
    },
    illustration:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
    AddButton:{
        backgroundColor: '#31A05F',
        position:'fixed',
        bottom:40,
          right:40,
        "&:hover": {
          color: '#FFFF',
          backgroundColor: '#388E3C',
        },
    },
    productImg:{
        width: '100px',
        height: '100px',
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
};

function ViewProduct(props) {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
        axios.get(`http://127.0.0.1:8000/api/products/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                //console.log(res.data)
                setProducts(res.data)
                setLoading(false);
            }
        });
    }, [user]);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`http://localhost:8000/api/products/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <CircularProgress color="success" />
    }
    
    if (products.length > 0)
    {
        var showProductList = "";
        showProductList = products.map( (item, idx) => {
            return(
                <Grid item xs={4} key={idx}>
                    <Paper style={classes.paper}>
                        <ListItem sx={classes.positionImage}>
                        <CardMedia
                          component='img'
                          height='260'
                          width='260'
                          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                          image={`http://localhost:8000/${item.image}`}
                        />
                        </ListItem>
                        <ListItem>
                        <ListItemText primaryTypographyProps={classes.ProductTitle} 
                        secondaryTypographyProps={classes.QuantityTitle}
                        primary={item.name} secondary={item.category} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary= "Available Stocks" secondary={item.quantity} primaryTypographyProps={classes.ProductTitle} secondaryTypographyProps={classes.QuantityTitle}>
                          </ListItemText>
                        </ListItem>
                        <ListItem sx={classes.positionButton}>
                            <Button variant="contained" onClick={() => navigate(`/products/edit/${item.id}`,{state:item})} sx={classes.EditButton}>EDIT</Button>
                        </ListItem>
                    </Paper>
                </Grid>
            )
        });
    }
    else{
        showProductList = <Stack direction='column'>    
                <Typography variant='h5' sx={classes.HeaderSub}>
                
                </Typography>
        </Stack>
      }
    
        
        /*var product_HTMLTABLE = "";
       
        product_HTMLTABLE = products.map( (item, index) => {
            return (
            
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <Link to={"/edit-product"} state={item} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });*/
    

    return (
        <Box sx={{ display: 'flex' }}>
            <ResponsiveDrawer/>
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            <Toolbar />
            <Typography variant='h3' sx={classes.Header}>
                My Products
            </Typography>
            <Box>
                    <Button fullWidth onClick={() => navigate('/sellersearch')} component="form" elevation={1} sx={classes.SearchButton}>
                        <IconButton  sx={{ p: '10px' }} aria-label="menu">
                        <SearchIcon />
                        </IconButton>
                        <Button
                        sx={{ ml: 1, flex: 1, fontFamily: 'Poppins', }}
                        placeholder="Search product"
                        inputProps={{ 'aria-label': 'Search' }}
                        />
                    </Button>
            </Box>
            <Fab sx={classes.AddButton} aria-label="add" onClick={() => navigate('/products/add')}>
                <AddIcon sx={classes.addIcon}/>
            </Fab>
                <div style={classes.root}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                        {/*Render the InnerGrid as a child item */}
                        {showProductList}
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </Box>
    );

}

export default ViewProduct;