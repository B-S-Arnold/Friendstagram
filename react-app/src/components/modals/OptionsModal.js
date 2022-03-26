import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteCommentForm from '../forms/DeleteCommentForm';
import DeleteImageModal from './DeleteImageModal';
import EditImageModal from './EditImageModal';

const OptionsModal = ({ image }) => {
    const [renderModal, setRenderModal] = useState(false);


    return (
        <>
            <button className='options'onClick={() => setRenderModal(true)}>...</button>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <div className='optionsModal'>
                        <EditImageModal image={image} renderOptionsModal={setRenderModal}/>
                        <DeleteImageModal image={image} renderOptionsModal={setRenderModal}/>
                    </div>
                </Modal>
            ) : null
            }
        </>
    )
};

export default OptionsModal;