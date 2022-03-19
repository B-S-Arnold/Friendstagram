import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Home.css'

function UsersList() {
  const sessionUser = useSelector(state => state.session.user)
  const [users, setUsers] = useState([]);
  const images = Object.values(useSelector(state => state.images))
  console.log("ALL IMAGES", images)

  useEffect(() => {
    async function fetchData() { 
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  console.log("USERS", users)

  const userComponents = users.map((user) => {
    return (
      <div className='innerUserListDiv'>
        <NavLink to={`/${user.username}`} className='eachUser' key={user.id}>
          {user.profileImage}
        </NavLink>
        <div className='eachUserName'>
          {user.username}
        </div>
      </div>
    );
  });

  const allImages = images.map((image) => {
    const thisUser = users.map(user => {
      if (user.id === image.userId){
        return user}
      return null

    })
    return (
      <div className='eachImage' key={image.id}>
        <div> Post By: {thisUser[0]?.username}</div>
        <NavLink to={`/${sessionUser.username}`}>{image.picture}</NavLink>
        <div>{image.caption}</div> 
      </div>
    );
  });

  return (
    <div className='homePageContainer'>
      <div className='spacer'/>
      <div>
        <div className='userListDiv'>{userComponents}</div>
      </div>
      <div>
        <div className='imageListDiv'>{allImages}</div>
      </div>
    </div>
  );
}

export default UsersList;
