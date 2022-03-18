import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteImageForm from '../forms/DeleteImageForm';

const DeleteImageModal = ({ image }) => {
    const [renderModal, setRenderModal] = useState(false);


    return (
        <>
            <button onClick={() => setRenderModal(true)}>Delete</button>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <DeleteImageForm  onClose={() => setRenderModal(false)} setRenderModal={setRenderModal} />
                </Modal>
            ) : null
            }
        </>
    )
};

export default DeleteImageModal;