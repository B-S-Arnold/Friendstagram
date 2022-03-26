
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import AddImageModal from './modals/AddImageModal';
import './NavBar.css'
import { readImages } from '../store/images';
import { readComments } from '../store/comments';
import Dropdown from './Dropdown';
import { $CombinedState } from 'redux';





const NavBar = ({user}) => {

  const history = useHistory()
  const dispatch = useDispatch();

  useEffect(() => {

    async function fetchData() {
      await dispatch(readImages())
      await dispatch(readComments())
    }
    fetchData()
  }, [dispatch])


    const HomeButton = () => {

    const goHome = () => {
      history.push(`/`);
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
            <div className='splitter' />
          <div className='splitter' />
            <div>
              <NavLink className='navbarTitle' to='/' exact={true} activeClassName='active'>
                Friendstagram
              </NavLink>
            </div>
            <div className='splitter'/>
            <div className='splitter' />
            <div className='splitter' />
            <div className='navBtnContainer'>
              <div className='buttondiv'>
                <div className='buttondiv'>
                  <HomeButton />
                </div>
              </div>
              <div>
                <AddImageModal />
              </div>
              <div className=' buttondiv'>
              <div id='focus' tabIndex="1" className='userbtn navbtn'>
                  <Dropdown />
                </div>
              </div>
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
