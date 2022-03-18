import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddImageForm from './forms/AddImageForm';
import AddImageModal from './modals/AddImageModal';

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
      <li key={user.id}>
        <NavLink to={`/${user.username}`}>{user.username}</NavLink>
      </li>
    );
  });

  const allImages = images.map((image) => {
    const thisUser = users.map(user => {
      if (user.id === image.userId){
        return user}
      return null

    })
    return (
      <li key={image.id}>
        <div> Post By: {thisUser[0]?.username}</div>
        <NavLink to={`/${sessionUser.username}`}>{image.picture}</NavLink>
        <div>{image.caption}</div> 
      </li>
    );
  });

  return (
    <>
      <h1>Home Page: </h1>
      <div>
        <h2>List of all users</h2>
        <ul>{userComponents}</ul>
      </div>
      <div>
        <h2>List of all images</h2>
        <ul>{allImages}</ul>
      </div>
    </>
  );
}

export default UsersList;
