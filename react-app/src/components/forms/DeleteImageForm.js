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
        <div>
            <p>Are you sure you want to delete this post?</p>
            <p>All information associated will be lost.</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleClose}>No</button>
        </div>
    )
}

export default DeleteImageForm