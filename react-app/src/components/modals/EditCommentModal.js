import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditCommentForm from '../forms/EditCommentForm';

const EditCommentModal = ({ comment, setOptionsModal }) => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            <div className='editBtn' onClick={() => setRenderModal(true)}>Edit</div>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <EditCommentForm comment={comment} setOptionsModal={setOptionsModal} />
                </Modal>
            ) : null
            }
        </>
    )
};

export default EditCommentModal;