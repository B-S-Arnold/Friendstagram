import { FormModal } from '../../context/Modal';
import { useState } from 'react';
import ImageForm from '../forms/AddImage';

const AddImageModal = ( ) => {
    const [renderModal, setRenderModal] = useState(false);

    return (
        <>
            <button onClick={() => setRenderModal(true)}>Add Image</button>
            {renderModal ? (
                <FormModal onClose={() => setRenderModal(false)}>
                    <ImageForm onClose={() => setRenderModal(false)} />
                </FormModal>
            ) : null
            }
        </>
    )
};

export default AddImageModal;