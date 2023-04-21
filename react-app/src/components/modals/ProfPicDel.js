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

        });
        if (res.ok) {
            await res.json();
            renderOptionsModal(false);
            window.location.reload()
        }
        else {
            console.log("error")
        }
    }

    return (
        <>
            <div className='delppbtn btnhover' onClick={handleDel}>Remove Current Photo</div>
        </>
    )
};

export default ProfPicDel;