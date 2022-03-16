import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const { username }  = useParams();

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
  console.log(username)

  return (
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
    </ul>
  );
}
export default User;
