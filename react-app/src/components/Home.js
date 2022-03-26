import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddCommentForm from './forms/AddCommentForm';
import EditCommentForm from './forms/EditCommentForm';
import './Home.css'
import './Overflow.css'
import DeleteCommentModal from './modals/DeleteCommentModal';
import EditCommentModal from './modals/EditCommentModal';
import OptionsModal from './modals/OptionsModal';
import ViewImageModal from './modals/ViewImageModal';

function UsersList() {
  const sessionUser = useSelector(state => state.session.user)
  const [users, setUsers] = useState([]);
  const images = Object.values(useSelector(state => state.images))
  const comments = Object.values(useSelector(state => state.comments))

  useEffect(() => {
    async function fetchData() { 
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

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
  images.reverse()
  //NOT GETTING USERS!!!! (PART 1)
  const allImages = images.map((image) => {
    const thisUser = users?.filter(user => user.id === image.userId)[0]
    
  
   
    
    // .map(user => {
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
      // let expand = false
      
      // const commentEdit = () => {
      //   let expand = false;
      //   const expandEdit = () => {
      //     expand = true
      //   }
      
      //   return <button onClick={expandEdit}>Edit</button>
      // }
      // { expand === false ? <div>{comment.content}</div> : <EditCommentForm comment={comment} /> }

      return(
          <div  key={comment.id}>
          <div className='commentDiv'>
              <strong>{commenter?.username}</strong>
              
              {/* <div>{comment.content}</div> */}
              <div>{comment.content}</div>
              
              {sessionUser.id === comment.userId ? <>
              <div className='EDdiv'>
                <EditCommentModal comment={comment} />
                <DeleteCommentModal comment={comment}/>
              </div>
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
  
    // filter(img => img.userId === user.id)
    const expand = true

    //NOT GETTING USERS!!!! (PART 2)
    return (
      <div className='eachImage' key={image.id}>
        
        <div className='imghead'> 
          <NavLink className='eachPicPP' to={`/${thisUser?.username}`} />
          <NavLink className='eachPicUN'to={`/${thisUser?.username}`}>{thisUser?.username}</NavLink>
          {image.userId === sessionUser.id ? <OptionsModal image={image}/> : <div className='noimgOptions' /> }
          
        </div>
        <div className='imgdivhome'>
          
            <img
              className = 'imgpic'
              src={image?.picture}
              alt="new"
              onError={e => {
                e.onerror = null
                e.target.src = require('../images/not-found.jpeg').default
              }}
              
            />
        </div>
        
        <div className='imginfo'>
          <div className='homeCapDiv'>
            <strong>{thisUser?.username}</strong>
            <div>{image.caption}</div>
            <div className='EDdivfake' />
              
          </div>
          {/* RENDER COMMENTS */}
          {eachComment.length ?
            <>
              {eachComment.length === 1 ?
                <div>{eachComment}</div>
                : <ViewImageModal image={image} expand={expand} users={users}/> }
            </>

            
            : <></>}
          
        </div>
        <hr className='commentline'/>
        <AddCommentForm image = {image} thisDiv ={thisDiv}/>
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
        <div className='rightContainer'>
          <div className='staticContainer'>
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
              <div className='aboveLC'>
                <div className='linkContainer'>
                  <a className='personal' href='https://github.com/B-S-Arnold' >
                    GitHub
                  </a>
                  <a className='personal' href='https://www.linkedin.com/in/bryan-arnold-882378215/' >
                    LinkedIn
                  </a>
                  
                </div>
                <div className='linkContainer'>
                  <a className='personal' href='https://www.appacademy.io/' >
                    App Academy
                  </a>
                  <div className='personal'>
                    bryanscottarnold@gmail.com
                  </div>
                </div>
                <div className='linkContainer'>
                  <div className='personal'>
                    <div>2022 Friendstagram </div>
                    <div>from Bryan Arnold</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
