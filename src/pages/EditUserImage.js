import React, {useState} from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const EditUserImage = () => {

    const history = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [errorList, setError] = useState([]);
    const [imageProfile, setUserImage] = useState([]);

    const handleImage = (e) => {
        setUserImage({userImage:e.target.files[0]});
      }

    const updateImage = (e) => {
        e.preventDefault();
        
        const user_id = state.id;
        const formData = new FormData();
        formData.append('userImage', imageProfile.userImage);
        
        axios.put(`http://agrikonnect.herokuapp.com/${user_id}`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal('Success', res.data.message,'success');
                setError([]);
                history('/account');
            }
            else if(res.data.status === 422)
            {
                swal('All fields are required', 'error');
                setError(res.data.errors);
            }
        });
    }

    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit User Image
                                    <Link to={'/account'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateImage} encType='multipart/form-data' >

                                    <div className="container">
                                        <div className="material-textfield">
                                        <input placeholder=" " name="userImage" onChange={handleImage} type="file" />
                                        <label>Upload Image</label>
                                        <small className='text-danger'>{errorList.userImage}</small>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Save User</button>
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

export default EditUserImage; 