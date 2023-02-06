import React from 'react';
import { Link } from 'react-router-dom';

function NavbarCustomer ()
{
  return(
    <div className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">AgriKonnect</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/customer-homepage">HOME</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/basket">BASKET</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customer-account">ACCOUNT</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarCustomer;