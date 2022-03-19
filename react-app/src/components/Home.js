import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddCommentForm from './forms/AddCommentForm';
import EditCommentForm from './forms/EditCommentForm';
import './Home.css'
import DeleteComentModal from './modals/DeleteCommentModal';

function UsersList() {
  const sessionUser = useSelector(state => state.session.user)
  const [users, setUsers] = useState([]);
  const images = Object.values(useSelector(state => state.images))
  const comments = Object.values(useSelector(state => state.comments))
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
      <div key={user.id} className='innerUserListDiv'>
        <NavLink to={`/${user.username}`} className='eachUser' >
          {user.profileImage}
        </NavLink>
        <div className='eachUserName'>
          {user.username}
        </div>
      </div>
    );
  });

  //NOT GETTING USERS!!!! (PART 1)
  const allImages = images.map((image) => {
    const thisUser = users?.filter(user => user.id === image.userId)[0]
    
    
    
    
    // .map(user => {
    //   console.log("THIS USER", user)
    //   if (user?.id === image?.userId){
    //     return user}
    //   return null

    // })
// (user => user.id === image.userId)
    //function for comments
    const allComments = comments.filter(comment => comment.imageId === image.id)

    //func for rendering comments
    const eachComment = allComments.map((comment) => {
      return(
          <div key={comment.id}>
            <div>
            Comment: {comment.content}
            {sessionUser.id === comment.userId ? <>
            <EditCommentForm comment={comment}/>
            <DeleteComentModal comment={comment}/>
            </> : <></>}
            </div>
          </div>
      )
    })
    // console.log("THIS USER!!!!!!!!",thisUser)
    // filter(img => img.userId === user.id)

    //NOT GETTING USERS!!!! (PART 2)
    return (
      <div className='eachImage' key={image.id}>
        <NavLink to={`/${thisUser?.username}`}>{thisUser?.username}</NavLink>
        <div> Picture: {image?.picture}</div>
        <div>
          <div>{image.caption}</div>
          <div>
            <div>{eachComment}</div>
          </div>
        </div>
        <AddCommentForm image = {image}/>
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
