
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import AddImageModal from './modals/AddImageModal';
import './NavBar.css'
import { readImages } from '../store/images';
import DropdownModal from './modals/DropdownModal';
import { readComments } from '../store/comments';
import LogoutButton from './auth/LogoutButton';
import Dropdown from './Dropdown';





const NavBar = ({user}) => {

  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchData() {
      await dispatch(readImages())
      await dispatch(readComments())
    }
    fetchData()
  }, [dispatch])

  
    return (
      <div className='containerContainer'>
        <nav className='navContainer'>
          <div className='navUL'>
            <div className='splitter' />
            <div>
              <NavLink className='navbarTitle' to='/' exact={true} activeClassName='active'>
                Friendstagram
              </NavLink>
            </div>
            <div className='splitter'/>
            <div className='navBtnContainer'>
              <div className='buttondiv'>
                <div className='buttondiv'>
                  <button className='homebtn navbtn' />
                </div>
              </div>
              <div>
                <AddImageModal />
              </div>
              <div className=' buttondiv'>
                <button className='userbtn navbtn'>
                  <Dropdown />
                </button>
              </div>
              <div className='splitter' />
            </div>
          </div>
        </nav>
      </div>
    );
  }
//   return <></>
// }

export default NavBar;
