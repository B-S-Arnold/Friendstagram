
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddImageModal from './modals/AddImageModal';
import DemoUser from './auth/DemoUser';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { readImages } from '../store/images';



const NavBar = ({user}) => {

  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchData() {
      await dispatch(readImages())
    }
    fetchData()
  }, [dispatch])
  
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
          <li>
            <AddImageModal />
          </li>
        </ul>
      </nav>
    );
  }
//   return <></>
// }

export default NavBar;
