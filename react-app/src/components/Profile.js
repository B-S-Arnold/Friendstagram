import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChangeProfPicModal from './modals/ChangeProfPicModal';
import ViewImageModal from './modals/ViewImageModal';
import './Profile.css'
import FollowForm from './forms/FollowForm';
import UnfollowForm from './forms/UnfollowForm';


function User() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState({})
  const { username } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  // const sessionUser = useSelector(state => state.session.user)
  // const navigate = useNavigate

  //  if (!sessionUser) {
  //   navigate(`/`);
  // }


  const follows = Object.values(useSelector(state => state.follows))
  const userFollowers = follows.filter(follow => follow.followedId === user.id)
  const userFollowing = follows.filter(follow => follow.userId === user.id)
  const followed = userFollowers?.filter(follow => follow.userId === sessionUser.id)



  const followCSS = 'btn'


  // const images = Object.values(useSelector(state => state.images))
  // const [images, setImages] = useState([])
  const images = Object.values(useSelector(state => state.images))

  const userImages = images.filter(img => img.userId === user.id)

  useEffect(() => {
    if (!username) {
      return;
    }
    (async () => {
      const usersRes = await fetch('/api/users/');
      const responseData = await usersRes.json();
      setUsers(responseData.users);


      const response = await fetch(`/api/users/${username}`);
      const user = await response.json();
      setUser(user);
      // console.log("USER!!!", user)

      // const res = await fetch('/api/images');
      // if (res.ok) {
      //   const data = await res.json();
      //   console.log(data)
      //   setImages(data.images)
      // } else {
      //   console.log("error")
      // }

      // const usersRes = await fetch('/api/users/');
      // const responseData = await usersRes.json();

    })();
  }, [username]);

  if (!user || !users) {
    return null;
  }
  //ALL IMAGES DISPLAYED FUNCTION
  userImages.reverse()
  const allImages = userImages.map((image) => {
    const expand = false;
    return (
      <div key={image.id}>
        <ViewImageModal image={image} expand={expand} users={users} />
      </div>
    );
  });



  return (
    <div className='profPageContainer'>
      <div className='spacer' />
      <div className='profHead'>
        <div>{user.url ?
          <>

            <ChangeProfPicModal user={user} />
          </> : <>

            <ChangeProfPicModal user={user} />
          </>}</div>
        {/* <div className= 'profpic'/> */}
        <div className='profInfo'>
          <div className='profUN'>
            {username}

            {sessionUser?.id !== user?.id ?
              <>{followed?.length > 0 ? <UnfollowForm follow={followed[followed.length - 1]} followCSS={followCSS} />
                : <FollowForm user={user} followCSS={followCSS} />}</>
              : <></>}
          </div>

          <div className='profNum'>
            <div className='eachNum'>
            {userImages?.length === 1 ? <><strong>{userImages?.length}</strong> post</>
              : <><strong>{userImages?.length}</strong> posts</>}
            </div>
            <div className='eachNum'>
            {userFollowers?.length === 1 ? <><strong>{userFollowers?.length}</strong> follower</>
              : <><strong>{userFollowers?.length}</strong> followers</>}
            </div>
            <div className='eachNum'>
            <strong>{userFollowing.length}</strong> following
            </div>
          </div>
          <div className='profFNandBio'>
            <strong>{user.fullName}</strong>
            {followed?.length > 0 || user.id === sessionUser.id ? <div>{user.bio ? <> {user.bio}</> : <> </>}</div>
              : <><div className='spacer'/><div><strong>This account is private</strong><div></div>Follow this account to see their photos and videos</div></>}
            
          </div>
        </div>
        <div className='minispacer' />
      </div>
      {followed?.length > 0 || user.id === sessionUser.id ? <><div className='myImageDiv'>{allImages}</div></>
        : <></>}


    </div>

  );
}
export default User;
