import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteImageModal from './DeleteImageModal';
import EditImageModal from './EditImageModal';

const OptionsModal = ({ image, optionsCSS }) => {
    const [renderModal, setRenderModal] = useState(false);


    return (
        <>
            <button className={optionsCSS} onClick={() => setRenderModal(true)}>...</button>
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