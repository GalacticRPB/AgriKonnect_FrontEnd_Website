import React , {useState} from 'react';
import {Container} from '@mui/material'
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
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


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
  CustomTextField: {
    "& .MuiInputLabel-root": {color: '#5F5B5B'},//styles the label
    "& .MuiOutlinedInput-root": {
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      '& label.Mui-focused': {
        color: 'gray',
      },
    }
  },
  CustomOutlineTextField: {
    "& .MuiInputLabel-root": {color: '#5F5B5B'},//styles the label
    "& .MuiOutlinedInput-root": {
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      '& label.Mui-focused': {
        color: 'gray',
      },
    }
  }
}



const RegisterCustomer = () => {

  const [userInput, setUser] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    username: '',
    email: '',
    mobilephone: '',
    password: '',
  });
    
  const history = useNavigate();
  const [errorList, setError] = useState([]);


  const handleInput = (e) => {
    e.persist();
    setUser({...userInput, [e.target.name]:e.target.value});
  }

  const customerSignup = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', userInput.firstname);
    formData.append('middlename', userInput.middlename);
    formData.append('lastname', userInput.lastname);
    formData.append('username', userInput.username);
    formData.append('email', userInput.email);
    formData.append('password', userInput.password);
    formData.append('mobilephone', userInput.mobilephone);


    axios.post(`http://localhost:8000/api/registerCustomer`,formData,
      {headers: { "Content-Type": "multipart/form-data" },})
      .then(res=>{
        if(res.data.status === 200)
        {
            swal('Success', res.data.message,'success');
            setError([]);
            history('/login-customer');
        }
        else if(res.data.status === 422)
        { 
            setError(res.data.errors);
        }
      });
  }
    return (
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
                CREATE ACCOUNT
              </Typography>
              <Typography sx={classes.SubHeader} component="h1" variant="h6">
                Sign-up to continue
              </Typography>
              <Box component="form" onSubmit={customerSignup} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoFocus
                  error={errorList.firstname ? true : false}
                  helperText={errorList.firstname? true : false}
                  onChange={handleInput} 
                  value={userInput.firstname}
                  sx={classes.CustomTextField}
                >
                </TextField>
                <small className='text-danger'>{errorList.firstname}</small>
                <TextField
                  margin="normal"
                  fullWidth
                  id="middlename"
                  label="Middle Name"
                  name="middlename"
                  autoFocus
                  error={errorList.middlename ? true : false}
                  helperText={errorList.middlename? true : false}
                  onChange={handleInput} 
                  value={userInput.middlename}
                  sx={classes.CustomTextField}
                >
                </TextField>
                <small className='text-danger'>{errorList.middlename}</small>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoFocus
                  error={errorList.lastname ? true : false}
                  helperText={errorList.lastname? true : false}
                  onChange={handleInput} 
                  value={userInput.lastname}
                  sx={classes.CustomTextField}
                >
                </TextField>
                <small className='text-danger'>{errorList.lastname}</small>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  error={errorList.username ? true : false}
                  helperText={errorList.username? true : false}
                  onChange={handleInput} 
                  value={userInput.username}
                  sx={classes.CustomTextField}
                >
                </TextField>
                <small className='text-danger'>{errorList.username}</small>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  error={errorList.email ? true : false}
                  helperText={errorList.email? true : false}
                  onChange={handleInput} 
                  value={userInput.email}
                  sx={classes.CustomTextField}
                >
                </TextField>
                <small className='text-danger'>{errorList.email}</small>

                <TextField
                  margin="normal"
                  fullWidth
                  id="mobilephone"
                  label="Phone Number"
                  name="mobilephone"
                  autoFocus
                  error={errorList.mobilephone ? true : false}
                  helperText={errorList.mobilephone? true : false}
                  onChange={handleInput} 
                  value={userInput.mobilephone}
                  sx={classes.CustomTextField}
                >
                </TextField>
                <small className='text-danger'>{errorList.mobilephone}</small>
                <TextField
                  sx={classes.CustomTextField}
                  margin="normal"
                  required
                  fullWidth
                  onChange={handleInput} 
                  value={userInput.password}
                  id="password"
                  label="Password"
                  name="password"
                  type='password'
                  autoFocus
                  error={errorList.password ? true : false}
                  helperText={errorList.password}
                >
                </TextField>
                <small className='text-danger'>{errorList.password}</small>

                <br></br>
                <br></br>
                <div className='form-group'>
                  <label><input type="checkbox" name="privacy" onChange={handleInput} value={userInput.privacy}></input> I hereby authorize AgriKOnnect to collect and process the data indicated herein for the purpose of the usage of the application. I understand that my personal information is protected by RA 10173, Data Privacy Act of 2012.</label>
                  <small className='text-danger'>{errorList.privacy}</small>
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={classes.registerbutton}
                >
                  REGISTER
                </Button>
                <Box
                  sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  }}
                >
                <Typography sx={classes.SubText}>
                  Already have an account?
                  <Link sx={classes.Text} href="/login-customer" variant="body1">
                            {" Login here"}
                          </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    );

}

export default RegisterCustomer;