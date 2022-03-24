import { deleteImage } from '../../store/images';
import { useDispatch } from 'react-redux';

const DeleteImageForm = ({setRenderModal, image}) => {
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deleteImage(image))
    }

    const handleClose = (e) => {
        setRenderModal(false);
        
    }
    return (
        <div className='delModal'>
            <div className='delBtn' onClick={handleDelete}>Delete</div>
            <div className='cancelBtn' onClick={handleClose}>Cancel</div>
        </div>
    )
}

export default DeleteImageForm