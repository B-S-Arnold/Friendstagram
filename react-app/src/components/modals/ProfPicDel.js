import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteImageForm from '../forms/DeleteImageForm';
import DelProfPicForm from './DelProfPicForm';

const ProfPicDel = ({ user, renderOptionsModal }) => {
    const [renderModal, setRenderModal] = useState(false);


    const handleDel = async (e) => {
        e.preventDefault();
       
        const res = await fetch(`/api/users/del/${user.id}`, {
            method: "PUT",
            // body: formData
        });
        if (res.ok) {
            await res.json();

            renderOptionsModal(false);
        }
        else {
            console.log("error")
        }
    }

    return (
        <>
            <div className='delppbtn btnhover' onClick={handleDel}>Remove Current Photo</div>
            {/* {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <button onClick={handleDel} />
                    <DelProfPicForm onClose={() => setRenderModal(false)} renderOptionsModal={renderOptionsModal} user={user} />
                </Modal>
            ) : null
            } */}
        </>
    )
};

export default ProfPicDel;