import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function AdminTable() {

    const [loading, setLoading] = useState(true);
    const [users, setUser] = useState([]);
    const [users2, setUser2] = useState([]);
    const history = useNavigate();

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

        axios.get(`http://localhost:8000/api/users2`).then(res=>{
            if(res.status === 200)
            {
                setUser2(res.data.users2)
                setLoading(false);
            }
        });

    }, []);

    if(loading)
    {
        return <CircularProgress color="success" />
    }
    else
    {
        var user_HTMLTABLE = "";
       
        user_HTMLTABLE = users.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.middlename}</td>
                    <td>{item.lastname}</td>
                    <td>{item.username}</td>
                    <td>{item.orgName}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="80px" alt=""/></td>
                    <td>{item.mobilephone}</td>
                    <td>{item.verified}</td>
                    <td>
                        <Link to={`/edit-verification/${item.id}`} state={item} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                </tr>
            );
        });

        var user2_HTMLTABLE = "";
       
        user2_HTMLTABLE = users2.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.middlename}</td>
                    <td>{item.lastname}</td>
                    <td>{item.username}</td>
                    <td>{item.orgName}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="80px" alt=""/></td>
                    <td>{item.mobilephone}</td>
                    <td>{item.verified}</td>
                    <td>
                        <Link to={`/edit-verification/${item.id}`} state={item} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Unverified Seller Data
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>First Name</th>
                                            <th>Middle Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>Organization Name</th>
                                            <th>Image</th>
                                            <th>Phone Number</th>
                                            <th>Verified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Verified Seller Data
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>First Name</th>
                                            <th>Middle Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>Organization Name</th>
                                            <th>Image</th>
                                            <th>Phone Number</th>
                                            <th>Verified</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user2_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button onClick={logout} >Log Out</button>
        </div>
        </>
    );

}

export default AdminTable;