import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChangeProfPicForm from './forms/ChangeProfilePicForm';
import ChangeProfPicModal from './modals/ChangeProfPicModal';
import ViewImageModal from './modals/ViewImageModal';
import './Profile.css'

function Settings() {
    const sessionUser = useSelector(state => state.session.user)
    

    
    

    if (!sessionUser) {
        return null;
    }
   

    

    return (
        <div className='homePageContainer'>
            <div className = 'spacer' />
            <div className= 'userListDiv'>
            SETTINGS
           </div>
            <div>
                SETTINGS
            </div>
            <div>
                SETTINGS
            </div>
            <div>
                SETTINGS
            </div>
           
        </div>

    );
}
export default Settings;
