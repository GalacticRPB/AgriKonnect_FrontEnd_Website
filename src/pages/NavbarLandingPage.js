import React from 'react';
import logo from '../pages/images/logo.png';
import {Link} from 'react-router-dom';
function NavbarLandingPage ()
{
  return(
    <nav className="navbar navbar-light shadow sticky-top" style={{ backgroundColor: "#388E3C" }}>
        <Link className="navbar-brand" to="/">
            <img src={logo} style={{marginLeft: 50, float: 'left'}} width="70" height="70" alt=""/>
            <p style={{ fontWeight: 'bold', color: 'white', marginTop: 20, }}>AgriKOnnect</p>
        </Link>
        
    </nav>
        
    );
}

export default NavbarLandingPage;