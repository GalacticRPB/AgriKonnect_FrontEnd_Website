import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useLocation} from 'react-router';
import { Box, 
    FormControl, 
    Button, 
    InputLabel, 
    Select,
    MenuItem,
    Stack,
    TextField, 
    Avatar, 
    Typography, 
    Chip} from '@mui/material';
import ResponsiveDrawer from '../components/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';

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
    Icon:{
        width: 200,
        height: 200,
        margin: 1,
    },
    UploadImageButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        borderRadius: 10,
        padding: 2,
        margin: 4,
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    },
    DetailsText:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        textAlign:'left',
        marginTop: 2,
    },
    IconPosition:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    EditButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
        margin: 5,
    }
}

const EditAccount = () => {

    const location = useLocation();
    const history = useNavigate();
    const state = location.state;
    const [errorInput, setError] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [userInput, setUser] = useState(state); 

    let user = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('user', JSON.stringify(user))

    const id = user.id

    const handleInput = (e) => {
        e.persist();
        setUser({...userInfo, [e.target.name]: e.target.value });
    }

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/userInfo/${id}`).then(res=>{
            if(res.status === 200)
            {
                //console.log(res.data)
                setUserInfo(res.data.userInfo);
            }
        });
    }, [id]);

    const updateUsername = (e) => {
        e.preventDefault();

        const id = state.id;
        const sellerUsername = {
            username: userInput.username || state.username
        }

        axios.put(`http://localhost:8000/api/update/${id}`, sellerUsername).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success");
                setError([]);
                history('/edit-account');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/edit-account');
            }
        });
    }

    console.log(userInfo)
    return (
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer/>
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                                <Toolbar />
                                <Stack direction='row'>
                                    <Button onClick={() =>  history('/account')}>
                                    <ArrowBackIcon sx = {classes.arrowback}/>
                                    </Button>
                                    <Typography variant='h4' sx={classes.Header}>
                                        Contact Information
                                    
                                    </Typography>
                                </Stack>
                                <Stack direction="column"> 
                                <form onSubmit={(e) => updateUsername(e)}>
                                
                                    <div className="form-group mb-3">
                                            <Typography sx={classes.DetailsText}>
                                                FIRST NAME
                                            </Typography>
                                            {user.firstname}
                                        </div>
                                        <div className="form-group mb-3">
                                        <Typography sx={classes.DetailsText}>
                                        MIDDLE NAME
                                        </Typography>
                                        {user.middlename}
                                        </div>
                                        <div className="form-group mb-3">
                                        <Typography sx={classes.DetailsText}>
                                        LAST NAME
                                        </Typography>
                                        {user.lastname}
                                        </div>
                                        <div className="form-group mb-3">
                            
                                        <Typography sx={classes.DetailsText}>
                                            USERNAME
                                        </Typography>
                                    
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                            <input type="text" name="username" onChange={(e) => handleInput(e)} defaultValue={userInput?.username} className="form-control" />
                                            <span className="text-danger">{errorInput.username}</span>
                                        </div>
                                            <button type="submit" id="updatebtn" className="btn btn-success">UPDATE</button>
                                        </div>
                                        </div>
                                        <div className="form-group mb-3">
                                        <Typography sx={classes.DetailsText}>
                                            MOBILE NUMBER
                                        </Typography>
                                        {user.mobilephone}
                
                                        </div>
                                        <div className="form-group mb-3">
                                        <Typography sx={classes.DetailsText}>
                                            EMAIL
                                        </Typography>
                                        {user.email}
                        
                                        </div>
                                        <div className="form-group mb-3">
                                        <Typography sx={classes.DetailsText}>
                                        BARANGAY
                                        </Typography>
                                        {user.brgy} 
                            
                                        </div>
                                
                                </form>        

             </Stack>
             </Box>
        </Box>
    );

}

export default EditAccount; 