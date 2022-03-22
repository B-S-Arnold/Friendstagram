import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DeleteImageModal from './modals/DeleteImageModal';
import ViewImageModal from './modals/ViewImageModal';
import './Profile.css'

function User() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState({})
  const { username }  = useParams();
  
  const images = Object.values(useSelector(state => state.images))
  const userImages = images.filter(img => img.userId === user.id)
  console.log(images)
  console.log("USER IMAGES", userImages)

  useEffect(() => {
    if (!username) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${username}`);
      const usersRes = await fetch('/api/users/');
      const responseData = await usersRes.json();
      const user = await response.json();
      setUser(user);

      // const usersRes = await fetch('/api/users/');
      // const responseData = await usersRes.json();
      setUsers(responseData.users);

    })();
  }, [username]);

  if (!user || !users) {
    return null;
  }
  //ALL IMAGES DISPLAYED FUNCTION

  console.log("users!!!!",users)
  const allImages = userImages.map((image) => {
    const expand = false;
    return (
      <div key={image.id}>
          <ViewImageModal image={image} expand={expand} users={users}/>
      </div>
    );
  });

  return (
    <div className= 'profPageContainer'>
      <div className='spacer' />
      <div className='profHead'>
        <div className= 'profpic'/>
        <div className= 'profInfo'>
          <div className = 'profUN'>
            {username}
          </div>
          <div className = 'profNum'>
            <strong>{userImages.length}</strong> posts
          </div>
          <div className= 'profFNandBio'>
            <strong>{user.fullName}</strong>
            <div>{user.bio ? <><strong>Bio</strong> {user.bio}</> : <> </>}</div>
          </div>
        </div>
        <div className='minispacer'/>
      </div>
      
      <div className='myImageDiv'>{allImages}</div>
      
    </div>
  );
}
export default User;
