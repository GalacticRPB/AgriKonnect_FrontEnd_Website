import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditSeller() 
{

    const history = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [userInput, setSeller] = useState(state);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const user_id = state.id;
        axios.get(`http://agrikonnect.herokuapp.com/${user_id}`).then( res => {

            if(res.data.status === 200)
            {
                setSeller(res.data.user);
                setLoading(false);
            }
        });

    },[state.id]);

    const handleInput = (e) => {
        e.persist();
        setSeller({...userInput, [e.target.name]: e.target.value });
    }

    const updateSeller = (e) => {
        e.preventDefault();
        
        const user_id = state.id;
        // const data = clinicInput;
        const data = {
            verified: userInput.verified || state.verified,
        }

        axios.put(`http://agrikonnect.herokuapp.com/${user_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history('/admin-dashboard');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/admin-dashboard');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Seller Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Account Verification
                                    <button className='btn btn-danger btn-sm float-end' onClick={() => history.goBack()}>Back</button>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={(e) => updateSeller(e)}>
                                    <div>
                                        <label>Verified</label>
                                        <select type="text" id="verified" name="verified" onChange={(e) => handleInput(e)} value={userInput.verified} className="form-control" >
                                            <option value = "true">true</option>
                                            <option value = "false">false</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Seller</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditSeller;