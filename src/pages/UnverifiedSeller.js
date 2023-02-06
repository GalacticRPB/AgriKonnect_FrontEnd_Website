import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
import AdminResponsiveDrawer from '../components/AdminDrawer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, 
    Typography,
    Stack,
    Button,
    TableRow,
    TableBody,
    Toolbar, 
    styled,
    TableContainer,
    Paper,
    Table,
    TableHead,
    Fab
} from '@mui/material';
import { Image } from 'mui-image';
import ScrollTop from '../components/ScrollToTop';

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
    ViewButton: {
        fontFamily: 'Poppins',
        margin: 1,
        color: "#FFFF",
        backgroundColor: '#374989'
    },
    SubmitButton: {
      fontFamily: 'Poppins',
      margin: 1,
      color: "#FFFF",
      backgroundColor: '#388E3C'
  },
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#31A05F',
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: 'Poppins',
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

function UnverifiedTable(props) 
{
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUser] = useState([]);

    console.log(users)

    function logout()
    {
        localStorage.clear();
        history("/adminlogin");
    }
    useEffect(() => {

        axios.get(`http://localhost:8000/api/users`).then(res=>{
            if(res.status === 200)
            {
                setUser(res.data.users)
                setLoading(false);
            }
        });

    }, []);

    const updateSeller = (e) => {
        e.preventDefault();

        const sellerData = {
            verified: 'true',
        }

        axios.post( `http://localhost:8000/api/update-verification/${users[0].id}`, sellerData).then(res=> {
        if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                history('/admin-verified');
            }
    });
    }

    
    if(loading)
    {
        return <CircularProgress color="success" />
    }
    else
    {
        var user_HTMLTABLE = "";
       
        user_HTMLTABLE = users.map( (item, index) => {
            return (
                <TableBody>
                <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {item.id}
                  </StyledTableCell>
                    <StyledTableCell align="right">{item.firstname}</StyledTableCell>
                    <StyledTableCell align="right">{item.middlename}</StyledTableCell>
                    <StyledTableCell align="right">{item.lastname}</StyledTableCell>
                    <StyledTableCell align="right">{item.username}</StyledTableCell>
                    <StyledTableCell align="right"><Image duration={0} src={`http://localhost:8000/${item.image}`} width={80} alt=""/></StyledTableCell>
                    <StyledTableCell align="right">{item.mobilephone}</StyledTableCell>
                    <StyledTableCell align="right"><Button variant="contained" onClick={updateSeller}  sx={classes.ViewButton}>
                    Approve</Button></StyledTableCell>
                </StyledTableRow>
                </TableBody>
            );
        });

    }

    return (
        <>
        <Box sx={{ display: 'flex' }}>
        <AdminResponsiveDrawer/>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar id="back-to-top-anchor"/>
            <Stack direction="row" justifyContent='space-between'>
              <Typography variant='h2' sx={classes.Welcome}>
                Unverified Table
              </Typography>
              <Button sx={classes.SubmitButton} onClick={logout} variant="contained">
                LOGOUT
              </Button> 
            </Stack>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Middle Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
          </TableHead>
                {user_HTMLTABLE}
            </Table>
            </TableContainer>
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

export default UnverifiedTable;