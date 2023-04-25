import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChangeProfPicModal from './modals/ChangeProfPicModal';
import ViewImageModal from './modals/ViewImageModal';
import './Profile.css'
import EditUserForm from './forms/EditUserForm';

function Settings() {
    const user = useSelector(state => state.session.user)

    if (!user) {
        return null;
    }
   
    return (
        <div className='homePageContainer'>
            <div className = 'spacer' />
            <div>
                <div>{user.url ?
                    <>

                        <ChangeProfPicModal user={user} />
                    </> : <>

                        <ChangeProfPicModal user={user} />
                    </>}</div>
                <div>
                    <EditUserForm user={user}/>
                </div>
            </div>
           
        </div>

    );
}
export default Settings;
