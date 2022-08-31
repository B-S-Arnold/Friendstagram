import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteCommentForm from '../forms/DeleteCommentForm';

const DeleteCommentModal = ({ comment }) => {
    const [renderModal, setRenderModal] = useState(false);


    return (
        <>
            <button className='delcom' onClick={() => setRenderModal(true)}>...</button>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    
                    <DeleteCommentForm onClose={() => setRenderModal(false)} setRenderModal={setRenderModal} comment={comment} />
                </Modal>
            ) : null
            }
        </>
    )
};

export default DeleteCommentModal;