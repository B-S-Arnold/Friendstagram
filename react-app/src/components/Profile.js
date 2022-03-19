import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DeleteImageModal from './modals/DeleteImageModal';
import ViewImageModal from './modals/ViewImageModal';
import './ProfileAndView.css'

function User() {
  const [user, setUser] = useState({});
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
      const user = await response.json();
      setUser(user);
    })();
  }, [username]);

  if (!user) {
    return null;
  }
  //ALL IMAGES DISPLAYED FUNCTION
  const allImages = userImages.map((image) => {
    return (
      <div key={image.id}>
          <ViewImageModal image={image}/>
      </div>
    );
  });

  return (
    <>
      <div className='spacer' />
      <h2>User info</h2>
      <div>
        <div>
          <strong>User Id {user.id}</strong>
        </div>
        <div>
          <strong>Username</strong> {username}
        </div>
        <div>
          <strong>Email</strong> {user.email}
        </div>
        <div>
          <strong>Name</strong> {user.fullName}
        </div>
        <div>
          {user.bio ? <><strong>Bio</strong> {user.bio}</>: <></>}
        </div>
      </div>
      <div>
          <h2>All of {username}'s images</h2>
        <div className='myImageDiv'>{allImages}</div>
      </div>
    </>
  );
}
export default User;
