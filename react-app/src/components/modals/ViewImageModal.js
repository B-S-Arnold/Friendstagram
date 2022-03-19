import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteImageModal from './DeleteImageModal';
import { useSelector } from 'react-redux';
import EditImageForm from '../forms/EditImageForm';

const ViewImageModal = ({ image }) => {
    const [renderModal, setRenderModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user)

    console.log(image)
    // Make function so EDIT CAPTION BUTTON renders in place of CAPTION
    // Remeber to use pass IMAGE as props

    // const editCaptionBox = ({image}) => {
    //    return <EditImageForm image={image} />
    // }


    return (
        <div >
            <button className='myImage' onClick={() => setRenderModal(true)} image={image}>
            <h1> ID: {image.id} </h1>
            <h3> PIC: {image.picture}</h3>
            
            
            
            </button >
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <div onClose={() => setRenderModal(false)}>
                        <h1> ID: {image.id} </h1>
                        <h3> PIC: {image.picture}</h3>
                        <div>
                            {image.edited === true ? <><div>Edited Mar 18</div> <h3>{image.caption}</h3></> : <><div>Mar 18</div> <h3>{image.caption}</h3></> }
                            
                            {/* <button onClick={() => editCaptionBox}>Edit</button>  */}
                        </div>
                        
                        {sessionUser.id === image.userId? <>
            
                            <DeleteImageModal image={image}/>
                            <EditImageForm image={image}/>
                        
                        </>:<></>}
                    
                    </div>
                </Modal>
            ) : null
            }
        </div>
    )
};

export default ViewImageModal;