import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteImageModal from './DeleteImageModal';
import { useSelector } from 'react-redux';

const ViewImageModal = ({ image }) => {
    const [renderModal, setRenderModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user)


    return (
        <>
            <button onClick={() => setRenderModal(true)}>
            <h1> ID: {image.id} </h1>
            <h3> PIC: {image.picture}</h3>
            
            
            </button>
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <div onClose={() => setRenderModal(false)}>
                        <h1> ID: {image.id} </h1>
                        <h3> PIC: {image.picture}</h3>
                        <h3> CAP: {image.caption}</h3>
                        <h3> EDITED? {image.edited === true ? "true" : "false"}</h3>
                        {sessionUser.id === image.userId? <>
            
                            <DeleteImageModal image={image}/>
                            <b>Edit Caption</b>
                        
                        </>:<></>}
                    
                    </div>
                </Modal>
            ) : null
            }
        </>
    )
};

export default ViewImageModal;