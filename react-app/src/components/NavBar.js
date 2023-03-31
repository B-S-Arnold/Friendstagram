
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import AddImageModal from './modals/AddImageModal';
import './NavBar.css'
import { readImages } from '../store/images';
import { readComments } from '../store/comments';
import Dropdown from './Dropdown';
import SearchBar from './NavSearch';
import { readLikes } from '../store/likes';
import { readFollows } from '../store/follows';





const NavBar = ({ user }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchData() {
      await dispatch(readImages())
      await dispatch(readComments())
      await dispatch(readLikes())
      await dispatch(readFollows())
    }
    fetchData()
  }, [dispatch])


  const HomeButton = () => {

    const goHome = () => {
      navigate(`/`);
    }

    return <button className='homebtn navbtn' onClick={goHome} />
    // return <NavLink to={`/${user.username}`} exact={true} activeClassName='active'>
    //     Profile
    // </NavLink>
  };




  return (
    <div className='containerContainer'>
      {/* <nav className='navOuterContainer'> */}
      <div className='navContainer'>
        {/* <div className='splitter' /> */}
        <div className='splitter' />
        <div className='navtitlediv'>
          <NavLink className='navbarTitle' to='/' exact={'true'} >
            Friendstagram
          </NavLink>
        </div>
        {/* <div className='splitter' /> */}
        <SearchBar />
        {/* <div className='splitter' /> */}
        {/* <div className='splitter' /> */}
        <div className='nbcc'>
      
          <div className='navBtnContainer'>

            <div className='buttondiv'>
              <HomeButton />
            </div>
            <div className='buttondiv'>
              <AddImageModal />
            </div>
            <div className=' buttondiv'>
              <div id='focus' tabIndex="1" className='userbtn navbtn'>
                {user?.url ? <>

                  <img
                    className='userimgbtn'
                    src={user.url}
                    alt="new"

                    onError={e => {
                      e.onerror = null
                      e.target.src = require('../images/not-found.jpeg').default
                    }}


                  />
                </> : <></>}
                <Dropdown />
              </div>
              
            </div>
          
          </div>
          {/* <Dropdown /> */}
        </div>
        <div className='splitter' />
      </div>
      {/* </nav> */}
    </div>
  );
}
//   return <></>
// }

export default NavBar;
