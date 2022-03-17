import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

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
  
  const allImages = userImages.map((image) => {
    return (
      <li key={image.id}>
        <NavLink to={`/${username}`}>{image.picture}</NavLink>
        <div>{image.caption}</div>
      </li>
    );
  });

  return (
    <>
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
      </ul>
      <div>
          <h2>All of {username}'s images</h2>
          <ul>{allImages}</ul>
      </div>
    </>
  );
}
export default User;
