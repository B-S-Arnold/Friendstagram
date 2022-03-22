import { Modal } from '../../context/Modal';
import { useState } from 'react';
import AddImageForm from '../forms/AddImageForm';

const AddImageModal = () => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            <button className='addimg navbtn' onClick={() => setRenderModal(true)} />
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