import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditImageForm from '../forms/EditImageForm';

const EditImageModal = ({image, renderOptionsModal}) => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            <div className='editpost' onClick={() => setRenderModal(true)}>Edit Post</div>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <EditImageForm image = {image} setRenderModal={setRenderModal} renderOptionsModal={renderOptionsModal}/>
                </Modal>
            ) : null
            }
        </>
    )
};

export default EditImageModal;