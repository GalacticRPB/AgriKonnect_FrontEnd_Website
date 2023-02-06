import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useLocation} from 'react-router';
import { Box, CssBaseline, Button,Typography,
    GlobalStyles, Toolbar,Stack} from "@mui/material";
import CustomerResponsiveAppBar from '../components/CustomerResponsiveAppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const classes = {
    Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F5B5B',
      marginTop: 5,
      marginLeft: 2,
    },
    SubHeader: {
      fontFamily: 'Poppins',
      color: '#5F5B5B',
      fontSize: 25,
      marginBottom: 5,
    },
    SubmitButton: {
      fontFamily: 'Poppins',
      marginBottom: 5,
      color: "#FFFF",
      backgroundColor: '#388E3C'
    },
    illustration:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontFamily: 'Poppins',
        fontSize: 15,
        color: '#5F5B5B',
        marginLeft: 0,
        marginTop: 1,
    },
    labelItem: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#00000',
        backgroundColor: '#D9D9D9',
        borderColor: '#D9D9D9',
    },
    UploadImageButton:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        padding: 2,
        margin: 4,
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    },
    arrowback:{
        color: '#111111',
        width: 50,
        height: 50,
        marginTop: 5,
    },
}

const EditCustomerAccount = () => {

    const location = useLocation();
    const history = useNavigate();
    const [errorInput, setError] = useState([]);
    const state = location.state;
    const [customerInput, setCustomer] = useState(state);

    const handleInput = (e) => {
        e.persist();
        setCustomer({...customerInput, [e.target.name]: e.target.value });
    }

    const updateCustomer = (e) => {
        e.preventDefault();
        
        const customer_id = state.id;
        const data = {
            firstname: customerInput.firstname || state.firstname,
            middlename: customerInput.middlename || state.middlename,
            lastname: customerInput.lastname || state.lastname,
            mobilephone: customerInput.mobilephone || state.mobilephone,
            email: customerInput.email || state.email,
            password: customerInput.password || state.password,
            address: customerInput.address || state.address,

        }
        
        axios.put(`http://localhost:8000/api/updateCustomer/${customer_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history('/customer-account');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/customer-account');
            }
        });
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
                <Stack direction='row'>
                    <Button onClick={() => history('/customer-account/')}>
                        <ArrowBackIcon sx = {classes.arrowback}/>
                    </Button>
                    <Typography variant='h3' sx={classes.Header}>
                    Edit Profile
                    </Typography>
                </Stack>
                <Stack direction='column'>
                <form onSubmit={(e) => updateCustomer(e)} >
                    <div className="form-group mb-3">
                        <label>First Name</label>
                        <input type="text" name="firstname" onChange={(e) => handleInput(e)} defaultValue={customerInput?.firstname} className="form-control" />
                        <span className="text-danger">{errorInput.firstname}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Middle Name</label>
                        <input type="text" name="middlename" onChange={(e) => handleInput(e)} defaultValue={customerInput?.middlename} className="form-control" />
                        <span className="text-danger">{errorInput.middlename}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input type="text" name="lastname" onChange={(e) => handleInput(e)} defaultValue={customerInput?.lastname} className="form-control" />
                        <span className="text-danger">{errorInput.lastname}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Contact Number</label>
                        <input type="text" name="mobilephone" onChange={(e) => handleInput(e)} defaultValue={customerInput?.mobilephone} className="form-control" />
                        <span className="text-danger">{errorInput.mobilephone}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input type="text" name="email" onChange={(e) => handleInput(e)} defaultValue={customerInput?.email} className="form-control" />
                        <span className="text-danger">{errorInput.email}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>New Password</label>
                        <input type="password" name="password" onChange={(e) => handleInput(e)} defaultValue={customerInput?.password} className="form-control" />
                        <span className="text-danger">{errorInput.password}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Address</label>
                        <input type="text" name="address" onChange={(e) => handleInput(e)} defaultValue={customerInput?.address} className="form-control" />
                        <span className="text-danger">{errorInput.address}</span>
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" id="updatebtn" className="btn btn-success">SAVE CHANGES</button>
                    </div>
                </form>
                </Stack>
            </Box>
        </Box>
        </>
    );

}

export default EditCustomerAccount; 