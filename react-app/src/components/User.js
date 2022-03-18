import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DeleteImageModal from './modals/DeleteImageModal';
import ViewImageModal from './modals/ViewImageModal';

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
      <li key={image.id}>
          <ViewImageModal image={image}/>
      </li>
    );
  });

  return (
    <>
      <h2>User info</h2>
      <ul>
        <li>
          <strong>User Id {user.id}</strong>
        </li>
        <li>
          <strong>Username</strong> {username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
        <li>
          <strong>Name</strong> {user.fullName}
        </li>
        <li>
          {user.bio ? <><strong>Bio</strong> {user.bio}</>: <></>}
        </li>
      </ul>
      <div>
          <h2>All of {username}'s images</h2>
          <ul>{allImages}</ul>
      </div>
    </>
  );
}
export default User;
