import { Modal } from '../../context/Modal';
import { useState } from 'react';
import AddImageForm from '../forms/AddImageForm';

const AddImageModal = () => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            <button onClick={() => setRenderModal(true)}>Click Here to add an Image</button>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <AddImageForm />
                </Modal>
            ) : null
            }
        </>
    )
};

export default AddImageModal;