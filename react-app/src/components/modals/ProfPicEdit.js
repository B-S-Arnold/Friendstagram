import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditImageForm from '../forms/EditImageForm';
import ChangeProfPicForm from '../forms/ChangeProfilePicForm';

const ProfPicEdit = ({ user, renderOptionsModal }) => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            <div className='editppbtn btnhover' onClick={() => setRenderModal(true)}>Upload Photo</div>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <ChangeProfPicForm renderOptionsModal={renderOptionsModal} user={user} />
                </Modal>
            ) : null
            }
        </>
    )
};

export default ProfPicEdit;