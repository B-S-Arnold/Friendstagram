import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddCommentForm from './forms/AddCommentForm';
import './Home.css'
import './Overflow.css'
import DeleteCommentModal from './modals/DeleteCommentModal';
import EditCommentModal from './modals/EditCommentModal';
import OptionsModal from './modals/OptionsModal';
import ViewImageModal from './modals/ViewImageModal';
import UnlikeForm from './forms/UnlikeForm';
import LikeForm from './forms/LikeForm';

function UsersList() {
  const sessionUser = useSelector(state => state.session.user)
  const [users, setUsers] = useState([]);
  const images = Object.values(useSelector(state => state.images))
  // const [images, setImages] = useState([])
  const comments = Object.values(useSelector(state => state.comments))
  const likes = Object.values(useSelector(state => state.likes))
  
  // const images = imageArr.images
  console.log(images)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();

      // const res = await fetch('/api/images')
      // if (res.ok) {
      //   const data = await res.json();
      //   console.log(data)
      //   setImages(data.images)
      // } else {
      //   console.log('error')
      // }
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div key={user.id} className='innerUserListDiv'>

        <NavLink to={`/${user.username}`} className='eachUser' >
          { user.url ? <>

            <img
              className='eachUserPic'
              src={user.url}
              alt="new"

              onError={e => {
                e.onerror = null
                e.target.src = require('../images/not-found.jpeg').default
              }}

            />
          </> : <></>}
          
        </NavLink>
        {user.username.length <= 8 ? <>
          <div className='eachUserName'>
            {user.username}
          </div>

        </> : <>
          <div className='eachUserName'>
            {user.username.substring(0, 8) + '...'}
          </div>


        </>}

      </div>
    );
  });
  
  images.reverse()

  const allImages = images?.map((image) => {
    const thisUser = users?.filter(user => user.id === image.userId)[0]

    const allLikes = likes.filter(like => like.imageId === image.id)
    const liked = allLikes?.filter(like => like.userId === sessionUser.id)



    const allComments = comments.filter(comment => comment.imageId === image.id)

    //func for rendering comments
    const eachComment = allComments.map((comment) => {
      const commenter = users?.filter(user => user.id === comment.userId)[0]

      return (
        <div key={comment.id}>
          <div className='nameAndCapView'>
            <strong>{commenter?.username}</strong>

            {/* <div>{comment.content}</div> */}
            <div className='cap-com'>{comment.content}</div>

            {sessionUser.id === comment.userId ? <>
              <div className='EDdiv'>
                <EditCommentModal comment={comment} />
                <DeleteCommentModal comment={comment} />
              </div>
            </> : <></>}

          </div>
        </div>
      )
    })


    const thisDiv = <div></div>


    const expand = true


    return (
      <div className='eachImage' key={image.id}>

        <div className='imghead'>
          <NavLink className='eachPicPP' to={`/${thisUser?.username}`} >
            {thisUser?.url ? <>

              <img
                className='eachPicPP2'
                src={thisUser?.url}
                alt="new"

                onError={e => {
                  e.onerror = null
                  e.target.src = require('../images/not-found.jpeg').default
                }}

              />
            </> : <></>}
          </NavLink>
          <NavLink className='eachPicUN' to={`/${thisUser?.username}`}>{thisUser?.username}</NavLink>
          {image.userId === sessionUser.id ? <OptionsModal image={image} /> : <div className='noimgOptions' />}

        </div>
        <div className='imgdivhome'>

          <img
            className='imgpic'
            src={image?.url}
            alt="new"
            onError={e => {
              e.onerror = null
              e.target.src = require('../images/not-found.jpeg').default
            }}

          />
        </div>

        <div className='imginfo'>
          {liked?.length > 0 ? <UnlikeForm like={liked[liked.length - 1]} /> : <LikeForm image={image} />}
          {/* if allLikes.length === 1 then display "1 like" */}
          {allLikes?.length > 0 ?
            <div className='numlikes'>
              {allLikes?.length === 1 ? <>1 like</> : <>{allLikes.length} likes</>}
            </div>
            : <></>}
          <div className='nameAndCapView'>
            {image.caption ? <>
              <strong className='username'>{thisUser?.username}</strong>
              
              <div className='cap-com'>{image.caption}</div>
              {/* <div className='EDdivfake' /> */}
            </>
            : <></>}

          </div>
          {/* RENDER COMMENTS */}
          {eachComment.length ?
            <>
              {eachComment.length === 1 ?
                <div>{eachComment}</div>
                : <ViewImageModal image={image} expand={expand} users={users} />}
            </>


            : <></>}

        </div>
        
        <hr className='commentline' />
        <AddCommentForm image={image} thisDiv={thisDiv} />
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
                    {sessionUser.url ? <>

                      <img
                        className='eachUserPic'
                        src={sessionUser.url}
                        alt="new"

                        onError={e => {
                          e.onerror = null
                          e.target.src = require('../images/not-found.jpeg').default
                        }}

                      />
                    </> : <></>}
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
