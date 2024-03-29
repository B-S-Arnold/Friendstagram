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
import FollowForm from './forms/FollowForm';

function UsersList() {
  const sessionUser = useSelector(state => state.session.user)
  // const [users, setUsers] = useState([]);
  const users = Object.values(useSelector(state => state.user))
  const images = Object.values(useSelector(state => state.images))

  const comments = Object.values(useSelector(state => state.comments))
  const likes = Object.values(useSelector(state => state.likes))
  const follows = Object.values(useSelector(state => state.follows))
  const following = follows.filter(follow => follow.userId === sessionUser.id)

  // console.log(theseUsers, "These Users")

  const followedUsers = users.filter(user => {
    for (const follow of following) {
      if (follow.followedId === user.id) {
        return user
      }
    }
  })

  const accessibleUsers = users.filter(user => {

    const isFollowed = following.some(follow => follow.followedId === user.id);
    const isSessionUser = sessionUser.id === user.id;

    return isFollowed || isSessionUser;
  });

  const accessibleImages = images.filter(image => {
    return accessibleUsers.some(user => user.id === image.userId);
  });





  const suggestedUsers = users.filter(user => {

    const isFollowed = following.some(follow => follow.followedId === user.id);
    const isSessionUser = sessionUser.id === user.id;

    return !isFollowed && !isSessionUser;
  });





  const followCSS = 'homefollow'






  const suggestedArr = [];

  while (suggestedArr.length < 5 && suggestedArr.length < suggestedUsers.length) {
    const randomIndex = Math.floor(Math.random() * suggestedUsers.length);

    if (!suggestedArr.includes(suggestedUsers[randomIndex])) {
      suggestedArr.push(suggestedUsers[randomIndex]);
    }
  }

  const suggestedFunc = suggestedArr.map((user) => (
    <div key={user.id} className='sugusersdiv'>
      <div className='sugPicAndUN'>
        <NavLink className='eachPicPP VMPP' to={`/${user?.username}`} >
          {user?.url ? <>

            <img
              className='eachPicPP2'
              src={user?.url}
              alt="new"

              onError={e => {
                e.onerror = null
                e.target.src = require('../images/not-found.jpeg').default
              }}

            />
          </> : <></>}
        </NavLink>

        <div className='thisUserName'>
          <NavLink to={`/${user.username}`} className='usersUN'>{user.username}</NavLink>
          <div className='usersFN'> {user.fullName}</div>

        </div>
      </div>
      <div className='homefollowdiv' >
        <FollowForm user={user} followCSS={followCSS} />
      </div>

    </div>
  ));








  const optionsCSS = 'options'

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/users/');
  //     const responseData = await response.json();


  //     setUsers(responseData.users);
  //   }
  //   fetchData();
  // }, []);



  const userComponents = followedUsers.map((user) => {




    return (
      <div key={user.id} className='innerUserListDiv'>

        <NavLink to={`/${user.username}`} className='eachUser' >
          {user.url ? <>

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

  accessibleImages.reverse()
  const allImages = accessibleImages?.map((image) => {
    const thisUser = users?.filter(user => user.id === image.userId)[0]

    const allLikes = likes.filter(like => like.imageId === image.id)
    const liked = allLikes?.filter(like => like.userId === sessionUser.id)

    const followed = following?.filter(follow => follow?.followedId === image?.userId)



    const allComments = comments.filter(comment => comment.imageId === image.id)

   
    const eachComment = allComments.map((comment) => {
      const commenter = users?.filter(user => user.id === comment.userId)[0]

      return (
        <div key={comment.id}>
          <div className='nameAndCapView'>
            <div className='cap-com'>
              <NavLink className='capcomun eachPicUN' to={`/${commenter?.username}`}>{commenter?.username}</NavLink>
              {comment.content}

              {sessionUser.id === comment.userId ? <>
                { }
                <DeleteCommentModal comment={comment} />
                { }
              </> : <></>}

            </div>


          </div>
        </div>
      )
    })




    const thisDiv = <div></div>


    const expand = true



    if (
      image.userId === sessionUser.id || followed.length
    ) {
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
            {image.userId === sessionUser.id ? <OptionsModal image={image} optionsCSS={optionsCSS} /> : <div className='noimgOptions' />}

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
            { }
            {allLikes?.length > 0 ?
              <div className='numlikes'>
                {allLikes?.length === 1 ? <>1 like</> : <>{allLikes.length} likes</>}
              </div>
              : <></>}
            <div className='nameAndCapView'>
              {image.caption ? <>
                { }

                <div className='cap-com'>
                  <NavLink className='capcomun eachPicUN' to={`/${thisUser?.username}`}>{thisUser?.username}</NavLink>
                  {image.caption}
                </div>
                { }
              </>
                : <></>}

            </div>
            { }
            {eachComment.length ?
              <>
                {eachComment.length <= 2 ?
                  <div>{eachComment}</div>
                  : <ViewImageModal image={image} expand={expand} users={users} />}
              </>


              : <></>}

          </div>

          <hr className='commentline' />
          <AddCommentForm image={image} thisDiv={thisDiv} />
        </div>
      )
    }
  });



















  return (

    <div className='homePageContainer'>
      <div className='spacer' />
      <div className='centeredContainer'>
        <div className='rowdiv'>

          {followedUsers.length > 0 ?

            <div>
              <div className='userListDiv'>{userComponents}</div>
            </div> :

            <></>

          }

          { }
          {allImages.length > 0 ?
            <div>
              <div className='imageListDiv'>{allImages}</div>
              { }
            </div>
            :
            <div className='noFollowingContainer' >

              { }
              { }

              <div className='sugfont' >
                Follow more people so their posts
              </div >
              <div className='sugfont' >
                will appear on your feed
              </div >
              {suggestedFunc}
              { }
            </div>
          }




        </div>
        {allImages.length > 0 ?
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
                    <NavLink to={`/${sessionUser.username}`} className='usersUN'>{sessionUser.username}</NavLink>
                    <div className='usersFN'> {sessionUser.fullName}</div>

                  </div>

                </div>
                <div>
                  {suggestedFunc.length > 0 ?
                    <div className='sugfont'>
                      Suggestions for you
                    </div> : <div className='spacer' />}

                  {suggestedFunc}
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
          </div> : <></>}
      </div>
    </div>
  );
}

export default UsersList;
