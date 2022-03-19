import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteCommentForm from '../forms/DeleteCommentForm';

const DeleteComentModal = ({ comment }) => {
    const [renderModal, setRenderModal] = useState(false);


    return (
        <>
            <button onClick={() => setRenderModal(true)}>Delete</button>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <DeleteCommentForm onClose={() => setRenderModal(false)} setRenderModal={setRenderModal} comment={comment} />
                </Modal>
            ) : null
            }
        </>
    )
};

export default DeleteComentModal;