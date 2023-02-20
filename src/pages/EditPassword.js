import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useLocation} from 'react-router';
import { Box, 
    Button, 
    InputLabel, 
    Input, 
    Stack,
    Typography } from '@mui/material';
import ResponsiveDrawer from '../components/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const drawerWidth = 240;
const classes = {
    Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F645F',
      marginTop: 1,
      marginLeft: 2,
    },
    arrowback:{
        color: '#5F645F',
        width: 50,
        height: 50,
    },
    IconPosition:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Icon:{
        width: 200,
        height: 200,
        margin: 1,
    },
    TextPosition:{
        display: 'flex',
        alignItems: 'center',
        marginTop: 3,
        marginLeft: 1,
    },
    label: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        marginTop: 4,
        marginLeft: 1,
        textAlign: 'left',
    },
    EditButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        borderRadius: 1,
        margin: 5,
        width: 200,
        padding: 1,
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    }
}

const EditPassword = () => {

    const location = useLocation();
    const history = useNavigate();
    const [errorInput, setError] = useState([]);
    const state = location.state;
    const [userInput, setPassword] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setPassword({...userInput, [e.target.name]: e.target.value });
    }

    const updatePassword = (e) => {
        e.preventDefault();
        
        const user_id = state.id;

        console.log(user_id)
        const data = {
            password: userInput.password || state.password,
        }
        console.log(data)
        axios.put(`http://agrikonnect.herokuapp.com/${user_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history('/account');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/account');
            }
        });
    }

    
    return (
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer/>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Stack direction='row'>
              <Button onClick={() => history('/account')}>
              <ArrowBackIcon sx = {classes.arrowback}/>
              </Button>
              <Typography variant='h4' sx={classes.Header}>
                  Password
              </Typography>
          </Stack>
          <Stack direction="column" sx={classes.TextPosition}>
              <Box component="form" >
                  <Typography sx={classes.label}>
                  NEW PASSWORD
                  </Typography>
                  <Box sx={{ m: 1, width: '25ch',display: 'flex',
                  alignItems: 'center', }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password"></InputLabel>
                  <Input
                      id="password"
                      name='password'
                      type={'password'}
                      onChange={(e) => handleInput(e)} 
                      defaultValue={userInput?.password}
                  />
                  </Box>
                    <Button sx={classes.EditButton} onClick={(e) => updatePassword(e)} aria-label="add">
                      SAVE CHANGES
                    </Button>
              </Box>
          </Stack>
          </Box>
      </Box>
    );

}

export default EditPassword; 