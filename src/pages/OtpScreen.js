import axios from 'axios';
import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router';
import swal from 'sweetalert';
import {Container,
  FormHelperText,
  OutlinedInput,
} from '@mui/material'
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

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
        color: 'grey',
      },
    }
  },
  CustomOutlineTextField: {
    marginTop: 2,
    "& .MuiOutlinedInput-root": {
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      '& label.Mui-focused': {
        color: 'green',
      },
    }
  },
  Texts:{
    color: '#5F645F',
    fontFamily: 'Poppins',
  }
}

const OTPScreen = () => {
    const history = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));

    const email = user.customer.email;
    console.log(email)
    
    
    const [otpInput, setOTP] = useState({
        otp: '',
    });
    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
        setOTP({...otpInput, [e.target.name]: e.target.value })
    }
    const verifyEmail = (e) => {
        e.preventDefault();

        const data = {
            otp:otpInput.otp,
            email: email,
        }
      axios.post(`http://localhost:8000/api/verifyEmail`, data).then(
        res=> {
            if(res.status === 200)
            {
                swal("Success", res.data.message, "Success");
                setOTP({
                    otp: '',
                });
                setError([]);
                history('/login-customer');
            }
            else if(res.data.status === 422)
            { 
                swal("Failed", res.data.message, "Failed");
            }
        }
      )
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
              Email Verification
            </Typography>
            <Typography sx={classes.SubHeader} component="h1" variant="h6">
              Verify your Email
            </Typography>
              <Box component="form" onSubmit={verifyEmail} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  autoFocus
                  onChange={handleInput} 
                  value={otpInput.otp}
                  sx={classes.CustomTextField}
                >
                </TextField>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={classes.registerbutton}
                >
                  Verify
                </Button>
              </Box>
              <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
              >
            </Box>
            </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
    );

}

export default OTPScreen;