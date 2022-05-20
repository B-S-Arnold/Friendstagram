import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './ViewImage.css'
import DeleteCommentModal from './DeleteCommentModal';
import AddCommentForm from '../forms/AddCommentForm';
import OptionsModal from './OptionsModal';
import EditCommentModal from './EditCommentModal';
import { NavLink } from 'react-router-dom';
import ChangeProfPicForm from '../forms/ChangeProfilePicForm';


const ChangeProfPicModal = ({ user }) => {
    console.log("THIS USER!!!!", user)
    
    const [renderModal, setRenderModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
    // const users = Object.values(useSelector(state => state.users))
    let thisPic

    
        if (sessionUser?.id === user?.id){
            thisPic = (
                <>
                    {user?.url ? <>
                        <div className='leftPPSpacer'/>
                        <div className='behindBtn' onClick={() => setRenderModal(true)}>
                            <img
                                className='profpicbtn'
                                src={user.url}
                                alt="new"

                                onError={e => {
                                    e.onerror = null
                                    e.target.src = require('../../images/not-found.jpeg').default
                                }}

                            />
                        <div className='rightPPSpacer' />
                        </div>
                    </> : <>
                            <button className='noprofpicbtn' onClick={() => setRenderModal(true)} />
                    </>}
                </>
            
            )
        }else {
            thisPic = (
            <>
                {user?.url ? <>
                    <div >
                            <img
                                className='profpic'
                                src={user.url}
                                alt="new"

                                onError={e => {
                                    e.onerror = null
                                    e.target.src = require('../../images/not-found.jpeg').default
                                }}

                            />
                    </div>
                </> : <>
                    <div className='profpic' />
                </>}
            </>)
        }
        
    
    
    return (
        <>
        {thisPic}
        {/* {"hello"} */}
    
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <ChangeProfPicForm setRenderModal={setRenderModal} user={user} />
                </Modal>
            ) : null
            }

        </>
    )
    
    
};

    export default ChangeProfPicModal;