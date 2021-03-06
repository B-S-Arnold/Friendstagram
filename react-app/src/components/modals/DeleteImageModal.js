import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteImageForm from '../forms/DeleteImageForm';

const DeleteImageModal = ({ image, renderOptionsModal }) => {
    const [renderModal, setRenderModal] = useState(false);


    return (
        <>
            <div className='delpost' onClick={() => setRenderModal(true)}>Delete</div>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <DeleteImageForm  onClose={() => setRenderModal(false)} setRenderModal={setRenderModal} image={image} renderOptionsModal={renderOptionsModal} />
                </Modal>
            ) : null
            }
        </>
    )
};

export default DeleteImageModal;