import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChangeProfPicModal from './modals/ChangeProfPicModal';
import ViewImageModal from './modals/ViewImageModal';
import './Profile.css'

function Settings() {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return null;
    }
   
    return (
        <div className='homePageContainer'>
            <div className = 'spacer' />
            <div>{user.url ?
                <>

                    <ChangeProfPicModal user={user} />
                </> : <>

                    <ChangeProfPicModal user={user} />
                </>}</div>
            <div>
                Name {user.fullName}
            </div>
            <div>
                Username {user.username}
            </div>
            <div>
                Bio {user.bio}
            </div>
            <div>
                Email {user.email}
            </div>
            <div>
                Password {user.password}
            </div>
           
        </div>

    );
}
export default Settings;
