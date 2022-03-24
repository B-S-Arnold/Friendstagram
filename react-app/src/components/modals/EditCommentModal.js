import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditCommentForm from '../forms/EditCommentForm';

const EditCommentModal = ({ comment }) => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            <div className='editcom' onClick={() => setRenderModal(true)}>Edit</div>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <EditCommentForm comment={comment} />
                </Modal>
            ) : null
            }
        </>
    )
};

export default EditCommentModal;