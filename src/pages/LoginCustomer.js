import React , {useState}from 'react';
import {useNavigate} from 'react-router-dom';
import {Container,InputAdornment,IconButton,OutlinedInput,InputLabel, FormControl} from '@mui/material'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import illustration from '../assets/login.png';
import { Image } from 'mui-image';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import FaceIcon from '@mui/icons-material/Face';

const theme = createTheme();
const classes = {
  registerbutton: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    backgroundColor: '#388E3C',
    borderRadius: 5,
    mt: 3, 
    mb: 2,
    "&:hover": {
      color: '#FFFF',
      backgroundColor: '#6FCF97',
      borderColor: '#FFFF',
    },
  },
  Header: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#388E3C',
  },
  SubHeader:{
    fontFamily: 'Poppins',
    color: '#6C6D6C',
  },
  TextField:{
    color: '#388E3C'
  },
  Text:{
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#388E3C',
    alignItems: 'center'
  },
  SubText:{
    fontFamily: 'Poppins',
    color: '#000000',
  },
  PassText:{
    fontFamily: 'Poppins',
    color: '#000000',
    textAlign: 'right',
  },
  CustomTextField: {
    "& .MuiInputLabel-root": {color: '#5F5B5B'},//styles the label
    "& .MuiOutlinedInput-root": {
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      '& label.Mui-focused': {
        color: '#5F5B5B',
      },
    }
  }
}

const LoginCustomer = () =>
{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const history = useNavigate();

    async function customerLogin(e)
    {
        e.preventDefault();
        let item={username,password};
        let result = await fetch("http://agrikonnect.herokuapp.com",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
            },
            body:JSON.stringify(item)

        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result))
        
        if ("error" in result)
        {
            alert("Incorrect Username or Password!")
        }
        else
        {
            history("/customer-homepage")
        }
        
    }
    return(
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#4DA351',
              backgroundPosition: 'center',
            }}
          >
            <Container maxWidth="sm" sx={{alignItems: 'center',marginTop:15}}>
            <Image duration = {0} src={illustration} height= {'auto'} width= {'auto'}></Image>
            </Container>
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography sx={classes.Header} component="h1" variant="h5">
                LOGIN
              </Typography>
              <Typography sx={classes.SubHeader} component="h1" variant="h6">
                Login to continue
              </Typography>
              <Box component="form" noValidate onSubmit={customerLogin} sx={{ mt: 1 }}>
                <TextField
                  required
                  fullWidth
                  id="sellerusername"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  sx={classes.CustomTextField}
                />
                <FormControl fullWidth sx={{marginTop: 2}}>
                <OutlinedInput
                  placeholder='Password'
                  required
                  fullWidth
                  name="password"
                  id="password"
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={classes.registerbutton}
                >
                  LOGIN
                </Button>
                <Box
                  sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  }}
                >
                <Typography sx={classes.SubText}>
                  Don't have account?
                  <Link sx={classes.Text} href="/register-customer" variant="body1">
                            {" Register here"}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
}

export default LoginCustomer;