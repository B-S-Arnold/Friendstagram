import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddCommentForm from './forms/AddCommentForm';
import EditCommentForm from './forms/EditCommentForm';
import './Home.css'
import DeleteCommentModal from './modals/DeleteCommentModal';
import ViewImageModal from './modals/ViewImageModal';

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
  // console.log("USERS", users)

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
      const commenter = users?.filter(user => user.id === comment.userId)[0]
      return(
          <div key={comment.id}>
            <div>
            <strong>{commenter?.username}</strong> {comment.content}
            {sessionUser.id === comment.userId ? <>
            <EditCommentForm comment={comment}/>
            <DeleteCommentModal comment={comment}/>
            </> : <></>}
            </div>
          </div>
      )
    })

    // const ViewComments = () => {
      
    //   return <div className='exCom' onClick={Unexpand}>View all {eachComment.length} comments</div>
    //   return <div className='unexCom' onClick={Expand}>View all {eachComment.length} comments</div>
    const thisDiv = <div></div> 

    // }
    // console.log("THIS USER!!!!!!!!",thisUser)
    // filter(img => img.userId === user.id)
    const expand = true

    //NOT GETTING USERS!!!! (PART 2)
    return (
      <div className='eachImage' key={image.id}>
        <div className='imghead'>
          <NavLink to={`/${thisUser?.username}`}>{thisUser?.username}</NavLink>
          <NavLink to={`/${thisUser?.username}`}>{thisUser?.username}</NavLink>
          options modal
        </div>
        <div className='imgpic'> {image?.picture}</div>
        <div className='imginfo'>
          <div>{image.caption}</div>
          {/* RENDER COMMENTS */}
          {eachComment.length ?
            <>
              {eachComment.length === 1 ?
                <div>{eachComment}</div>
                : <ViewImageModal image={image} expand={expand} users={users}/> }
            </>

            
            : <></>}
          
        </div>
        <AddCommentForm className='imgadd'image = {image} thisDiv ={thisDiv}/>
      </div>
    );
  });


  return (
    
    <div className='homePageContainer'>
      <div className='spacer' />
      <div className='centeredContainer'>
        <div className='rowdiv'>
          
            <div>
              <div className='userListDiv'>{userComponents}</div>
            </div>
            <div>
              <div className='imageListDiv'>{allImages}</div>
            </div>
          
        </div>
        <div className='rowdiv'>
          <div className='userinfodiv'>
            <div className='innerUserListDiv'>
              <NavLink to={`/${sessionUser.username}`} className='thisUser' >
                {/* {sessionUser.profileImage} */}
              </NavLink>
            </div>
              <div className='thisUserName'>
                <div className='usersUN'>{sessionUser.username}</div>
                <div className='usersFN'> {sessionUser.fullName}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
