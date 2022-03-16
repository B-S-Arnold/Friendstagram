
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DemoUser from './auth/DemoUser';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'



const NavBar = ({user}) => {
  
    return (
      <nav className='container'>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Friendstagram
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${user.username}`} exact={true} activeClassName='active'>
              User
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    );
  }
//   return <></>
// }

export default NavBar;
